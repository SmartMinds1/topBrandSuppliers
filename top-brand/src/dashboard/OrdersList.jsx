import React from 'react'

const OrdersList = () => {
    const updateOrderStatus = (orderId, newStatus) => {
        setCartHistory((prev) =>
          prev.map((order) =>
            order.id === orderId
              ? { ...order, status: newStatus }
              : order
          )
        );
      };
      
  return (
    <div>
      <select
            value={order.status}
            onChange={(e) =>
                updateOrderStatus(order.id, e.target.value)
            }
            className="border p-1 rounded"
            >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipping">Shipping</option>
            <option value="cancelled">Cancelled</option>
        </select>

    </div>
  )
}

export default OrdersList
