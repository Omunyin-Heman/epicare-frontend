// server/controllers/mpesaController.js
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const stkPush = async (req, res) => {
  try {
    const { phone, amount } = req.body;

    // Step 1: Get OAuth Token
    const auth = Buffer.from(
      `${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`
    ).toString("base64");

    const tokenResponse = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: { Authorization: `Basic ${auth}` },
      }
    );
    const accessToken = tokenResponse.data.access_token;

    // Step 2: Send STK Push request
    const stkResponse = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: process.env.BUSINESS_SHORTCODE,
        Password: process.env.PASSWORD, // Base64(Shortcode+Passkey+Timestamp)
        Timestamp: process.env.TIMESTAMP,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phone, // phone number sending
        PartyB: process.env.BUSINESS_SHORTCODE,
        PhoneNumber: phone,
        CallBackURL: process.env.CALLBACK_URL,
        AccountReference: "Epicare",
        TransactionDesc: "Donation",
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.json(stkResponse.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: err.message });
  }
};
