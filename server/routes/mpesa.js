// server/routes/mpesa.js
import express from "express";
import { stkPush } from "../controllers/mpesaController.js";

const router = express.Router();

// initiate STK Push
router.post("/stkpush", stkPush);

export default router;
