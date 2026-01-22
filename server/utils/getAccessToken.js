//This files deals with MPESA intergration stuffs
const axios = require("axios");
require("dotenv").config();

const consumerKey = process.env.CONSUMER_KEY;
const consumerSecret = process.env.CONSUMER_SECRET;
const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

const url =
  "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

axios
  .get(url, {
    headers: {
      Authorization: `Basic ${auth}`,
    },
  })
  .then((response) => {
    console.log("Access Token:", response.data.access_token);
  })
  .catch((error) => {
    console.error(
      "Error getting access token:",
      error.response ? error.response.data : error.message
    );
  });
