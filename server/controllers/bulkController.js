const logger = require("../utils/logger");
const { query } = require("../utils/pgHelper");
const { validationResult } = require("express-validator");

const createBulkQuote = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      companyName,
      contactPerson,
      email,
      phone,
      country,
      businessType,
      products,
      quantities,
      deliveryRequirements,
      additionalInfo,
    } = req.body;

    if (
      !companyName ||
      !contactPerson ||
      !email ||
      !phone ||
      !country ||
      !businessType ||
      !products?.length
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const insertQuery = `
      INSERT INTO bulk_quotations (
        company_name, contact_person, email, phone, country,
        business_type, products, quantities, delivery_requirements, additional_info
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *;
    `;

    const values = [
      companyName,
      contactPerson,
      email,
      phone,
      country,
      businessType,
      JSON.stringify(products), // <-- convert to JSON string
      JSON.stringify(quantities), // <-- convert to JSON string
      deliveryRequirements || null,
      additionalInfo || null,
    ];

    const { rows } = await query(insertQuery, values);

    logger.info(`Order sent successfully`);
    return res.status(201).json({
      message: "Bulk quotation submitted successfully",
      data: rows[0],
    });
  } catch (error) {
    logger.error(`Error creating bulk quote: ${error.message}`);
    return res.status(500).json({ message: "Failed to submit bulk quotation" });
  }
};

const getAllBulkQuotes = async (req, res) => {
  try {
    const retrieveQuery = `SELECT * FROM bulk_quotations ORDER BY created_at DESC;`;
    const { rows } = await query(retrieveQuery);
    return res.status(200).json(rows);
  } catch (error) {
    logger.error(`Error fetching bulk quotes: ${error.message}`);
    console.error("Error fetching bulk quotes:", error);
    return res
      .status(500)
      .json({ message: "Failed to retrieve bulk quotations" });
  }
};

const deleteBulkQuoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteQuery = `DELETE FROM bulk_quotations WHERE id = $1 RETURNING id;`;
    const { rowCount } = await query(deleteQuery, [id]);

    if (rowCount === 0)
      return res.status(404).json({ message: "Bulk quotation not found" });

    logger.info("Bulk quotation deleted successfully");
    return res
      .status(200)
      .json({ message: "Bulk quotation deleted successfully" });
  } catch (error) {
    logger.error(`Error deleting bulk quote: ${error.message}`);
    console.error("Error deleting bulk quote:", error);
    return res.status(500).json({ message: "Failed to delete bulk quotation" });
  }
};

// Export the functions in CommonJS style
module.exports = {
  createBulkQuote,
  getAllBulkQuotes,
  deleteBulkQuoteById,
};
