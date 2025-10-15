// index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const getAccessToken = async () => {
  const auth = Buffer.from(
    `${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`
  ).toString("base64");

  const response = await axios.get(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    {
      headers: { Authorization: `Basic ${auth}` },
    }
  );
  return response.data.access_token;
};

// ✅ Real STK Push endpoint
app.post("/api/mpesa/stkpush", async (req, res) => {
  try {
    const token = await getAccessToken();
    const timestamp = new Date()
      .toISOString()
      .replace(/[^0-9]/g, "")
      .slice(0, 14);

    const password = Buffer.from(
      `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
    ).toString("base64");

    const stkURL =
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

    const response = await axios.post(
      stkURL,
      {
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: req.body.amount,
        PartyA: req.body.phone, // 2547xxxxxxxx
        PartyB: process.env.MPESA_SHORTCODE,
        PhoneNumber: req.body.phone,
        CallBackURL: process.env.MPESA_CALLBACK_URL,
        AccountReference: "Epicare Donation",
        TransactionDesc: "Donation",
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/api/mpesa/callback", (req, res) => {
  console.log("Safaricom Callback:", req.body);
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
