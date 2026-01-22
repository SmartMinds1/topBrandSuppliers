//This file handles all the ORDERS LOGIC and QUERIES
const logger = require("../utils/logger");
const { query } = require("../utils/pgHelper");

// USER : CREATE NEW ORDER <----------------------------------------------------------------------------
exports.createOrder = async (req, res) => {
  const userId = req.user.id; // from the token bearer
  console.log(req.user);

  const { items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "No items in order" });
  }

  // Calculate total
  const totalAmount = items.reduce(
    (sum, item) => sum + item.productPrice * item.sizeKg * item.qty,
    0
  );

  try {
    await query("BEGIN");

    // Create order
    const orderResult = await query(
      `INSERT INTO topbrand_orders (user_id, total_amount)
       VALUES ($1, $2)
       RETURNING id`,
      [userId, totalAmount]
    );

    const orderId = orderResult.rows[0].id;

    // Insert items
    for (const item of items) {
      await query(
        `INSERT INTO topbrand_order_items
         (order_id, product_name, package_type, size_kg, qty, product_price)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          orderId,
          item.productName,
          item.packageType,
          item.sizeKg,
          item.qty,
          item.productPrice,
        ]
      );
    }

    await query("COMMIT");

    logger.info("Order placed successfully");
    res.status(201).json({
      message: "Order placed successfully",
      orderId,
    });
  } catch (err) {
    await query("ROLLBACK");
    logger.error(`Error error placing order: ${err.message}`);
    res.status(500).json({ message: "Failed to place order" });
  }
};

// ADMIN : GET ALL ORDERS <--------------------------------------------------------------------------------
exports.getAllOrders = async (req, res) => {
  try {
    const result = await query(
      `
      SELECT 
        o.id,
        o.user_id,
        o.status,
        o.total_amount,
        o.created_at,
        COALESCE(
          json_agg(
            json_build_object(
              'id', oi.id,
              'productName', oi.product_name,
              'packageType', oi.package_type,
              'sizeKg', oi.size_kg,
              'qty', oi.qty,
              'productPrice', oi.product_price
            )
          ) FILTER (WHERE oi.id IS NOT NULL),
          '[]'
        ) AS items
      FROM topbrand_orders o
      LEFT JOIN topbrand_order_items oi ON oi.order_id = o.id
      GROUP BY o.id
      ORDER BY o.created_at DESC
      `
    );

    res.json(result.rows);
  } catch (err) {
    logger.error(`Error fetching orders: ${err.message}`);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// ADMIN : UPDATE ORDER STATUS ONLY<-----------------------------------------------------------------------------
exports.updateOrderStatusById = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = ["pending", "processing", "shipping", "cancelled"];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid order status" });
  }

  try {
    const result = await query(
      `
      UPDATE topbrand_orders
      SET status = $1
      WHERE id = $2
      RETURNING id, status
      `,
      [status, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    logger.info("Order status updated successfully");
    res.json({
      message: "Order status updated successfully",
      order: result.rows[0],
    });
  } catch (err) {
    logger.error(`Error updating order status: ${err.message}`);
    res.status(500).json({ message: "Failed to update order status" });
  }
};

// ADMIN : DELETE ORDER BY ID <------------------------------------------------------------------------------
exports.deleteOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    await query("BEGIN");

    await query(`DELETE FROM topbrand_order_items WHERE order_id = $1`, [id]);

    const result = await query(
      `DELETE FROM topbrand_orders WHERE id = $1 RETURNING id`,
      [id]
    );

    if (result.rowCount === 0) {
      await query("ROLLBACK");
      return res.status(404).json({ message: "Order not found" });
    }

    await query("COMMIT");

    logger.info("Order deleted successfully");
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    await query("ROLLBACK");
    logger.error(`Error deleting Order: ${err.message}`);
    res.status(500).json({ message: "Failed to delete order" });
  }
};

// USER : GET MY OWN ORDERS <------------------------------------------------------------------------------
exports.getMyOrders = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await query(
      `
      SELECT 
        o.id,
        o.user_id,
        o.status,
        o.total_amount,
        o.created_at,
        COALESCE(
          json_agg(
            json_build_object(
              'id', oi.id,
              'productName', oi.product_name,
              'packageType', oi.package_type,
              'sizeKg', oi.size_kg,
              'qty', oi.qty,
              'productPrice', oi.product_price
            )
          ) FILTER (WHERE oi.id IS NOT NULL),
          '[]'
        ) AS items
      FROM topbrand_orders o
      LEFT JOIN topbrand_order_items oi ON oi.order_id = o.id
      WHERE o.user_id = $1
      GROUP BY o.id
      ORDER BY o.created_at DESC
      `,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    logger.error(`Error fetching your own orders: ${err.message}`);
    res.status(500).json({ message: "Failed to fetch your orders" });
  }
};

// USER : UPDATE MY ORDER IF STILL PENDING <---------------------------------------------------------------
exports.updateMyOrder = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "Order must have items" });
  }

  const totalAmount = items.reduce(
    (sum, item) => sum + item.productPrice * item.qty,
    0
  );

  try {
    await query("BEGIN");

    // Verify ownership and pending status
    const orderCheck = await query(
      `
      SELECT status
      FROM topbrand_orders
      WHERE id = $1 AND user_id = $2
      `,
      [id, userId]
    );

    if (orderCheck.rowCount === 0) {
      await query("ROLLBACK");
      return res.status(404).json({ message: "Order not found" });
    }

    if (orderCheck.rows[0].status !== "pending") {
      await query("ROLLBACK");
      return res.status(403).json({
        message: "Only pending orders can be updated",
      });
    }

    // Update total only (status remains pending)
    await query(
      `
      UPDATE topbrand_orders
      SET total_amount = $1
      WHERE id = $2
      `,
      [totalAmount, id]
    );

    // Replace items
    await query(`DELETE FROM topbrand_order_items WHERE order_id = $1`, [id]);

    for (const item of items) {
      await query(
        `
        INSERT INTO topbrand_order_items
        (order_id, product_name, package_type, size_kg, qty, product_price)
        VALUES ($1, $2, $3, $4, $5, $6)
        `,
        [
          id,
          item.productName,
          item.packageType,
          item.sizeKg,
          item.qty,
          item.productPrice,
        ]
      );
    }

    await query("COMMIT");

    logger.info("Order updated successfully");
    res.json({ message: "Order updated successfully" });
  } catch (err) {
    await query("ROLLBACK");
    logger.error(`Error updating your order: ${err.message}`);
    res.status(500).json({ message: "Failed to update order" });
  }
};

// USER : CACEL MY ORDER IF STILL PENDING <----------------------------------------------------------------------------
exports.cancelMyOrder = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const result = await query(
      `
      UPDATE topbrand_orders
      SET status = 'cancelled'
      WHERE id = $1
        AND user_id = $2
        AND status = 'pending'
      RETURNING id
      `,
      [id, userId]
    );

    if (result.rowCount === 0) {
      return res.status(403).json({
        message: "Order cannot be cancelled",
      });
    }

    logger.info("Order cancelled successfully");
    res.json({ message: "Order cancelled successfully" });
  } catch (err) {
    logger.error(`Error cancelling your order ${err.message}`);
    res.status(500).json({ message: "Failed to cancel order" });
  }
};
