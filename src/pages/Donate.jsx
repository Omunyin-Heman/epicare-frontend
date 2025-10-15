import React, { useState, useEffect } from "react";
import axios from "axios";
import mpesaLogo from "../assets/mpesa-logo.png";
import paypalLogo from "../assets/paypal-logo.png";

function Donate() {
  const [phone, setPhone] = useState("");
  const [mpesaAmount, setMpesaAmount] = useState("");
  const [paypalAmount, setPaypalAmount] = useState("");
  const [mpesaMessage, setMpesaMessage] = useState("");
  const [paypalMessage, setPaypalMessage] = useState("");
  const [mpesaConfirmed, setMpesaConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load PayPal SDK dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AV8EdVcxMO-Cgtl-UyZPbMhdo90UGYciqwEY78DbaAyZcsr6W8FR10EmmiHrtBVi5f0GVlqiyBijzFtk&currency=USD";
    script.addEventListener("load", () => {
      if (window.paypal) {
        window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              const donationAmount = paypalAmount || "10.00";
              return actions.order.create({
                purchase_units: [{ amount: { value: donationAmount } }],
              });
            },
            onApprove: (data, actions) => {
              return actions.order.capture().then((details) => {
                const payerName = details.payer?.name?.given_name || "donor";
                setPaypalMessage(`✅ PayPal payment successful! Thank you, ${payerName}.`);
                // Build payload to send to server
                const capture = details.purchase_units?.[0]?.payments?.captures?.[0] || {};
                const amount = capture?.amount?.value || details.purchase_units?.[0]?.amount?.value;
                const currency = capture?.amount?.currency_code || details.purchase_units?.[0]?.amount?.currency_code || "USD";

                fetch("https://your-public-url.ngrok.io/api/payments/paypal/log", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    order_id: data.orderID,
                    payer_id: details.payer?.payer_id,
                    amount: amount,
                    currency: currency,
                    raw_payload: details,
                    status: capture?.status || "COMPLETED"
                  })
                }).catch((err) => console.error("paypal-log failed", err));
              });
            },

            onError: (err) => {
              console.error(err);
              setPaypalMessage("❌ PayPal payment failed. Please try again.");
            },
          })
          .render("#paypal-button-container");
      }
    });
    document.body.appendChild(script);
  }, [paypalAmount]);

  // Handle M-Pesa STK Push
  const handleMpesaClick = async () => {
    setMpesaMessage("");
    if (!phone || !mpesaAmount) {
      setMpesaMessage("⚠️ Please enter both phone and amount.");
      return;
    }

    if (!/^2547\d{8}$/.test(phone)) {
      setMpesaMessage("⚠️ Phone number must be in the format 2547XXXXXXXX");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("https://your-public-url.ngrok.io/api/mpesa/stkpush", {
        phone,
        amount: mpesaAmount,
      });
      if (res.data.success) {
        setMpesaMessage("✅ STK Push sent! Enter your M-Pesa PIN to complete payment.");
        setMpesaConfirmed(true);

        // Reset fields after 5 seconds
        setTimeout(() => {
          setPhone("");
          setMpesaAmount("");
          setMpesaMessage("");
          setMpesaConfirmed(false);
        }, 6000);
      } else {
        setMpesaMessage("❌ STK Push failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      setMpesaMessage("❌ Error sending STK Push. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-12 text-center text-gray-800">
        Support Epicare International
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl">
        {/* PayPal Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
          <img src={paypalLogo} alt="PayPal" className="w-32 mb-6" />
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Donate via PayPal</h2>
          <p className="text-gray-600 mb-6 text-center">
            Safe and secure donations with your PayPal account.
          </p>

          <input
            type="number"
            placeholder="Amount in USD"
            value={paypalAmount}
            onChange={(e) => setPaypalAmount(e.target.value)}
            className="border p-3 rounded-xl mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div id="paypal-button-container" className="w-full"></div>

          {paypalMessage && (
            <p
              className={`text-center font-medium mt-4 ${
                paypalMessage.includes("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {paypalMessage}
            </p>
          )}
        </div>

        {/* M-Pesa Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
          <img src={mpesaLogo} alt="M-Pesa" className="w-32 mb-6" />
          <h2 className="text-2xl font-semibold mb-4 text-green-700">Donate via M-Pesa</h2>
          <p className="text-gray-600 mb-6 text-center">
            Use STK Push to donate instantly from your M-Pesa account.
          </p>

          <div className="bg-green-50 p-4 rounded-xl mb-6 w-full text-center border border-green-100">
            <p><strong>Paybill:</strong> 123456</p>
            <p><strong>Account:</strong> EPICARE</p>
          </div>

          <input
            type="text"
            placeholder="Phone (2547XXXXXXXX)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-3 rounded-xl mb-4 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <input
            type="number"
            placeholder="Amount in KES"
            value={mpesaAmount}
            onChange={(e) => setMpesaAmount(e.target.value)}
            className="border p-3 rounded-xl mb-4 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <button
            onClick={handleMpesaClick}
            disabled={loading}
            className="bg-green-600 text-white font-semibold px-6 py-3 rounded-full w-full hover:bg-green-500 transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Confirm M-Pesa Donation"}
          </button>

          {mpesaMessage && (
            <p
              className={`text-center font-medium mt-4 ${
                mpesaMessage.includes("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {mpesaMessage}
            </p>
          )}

          {mpesaConfirmed && (
            <p className="text-center font-semibold mt-2 text-green-700">
              ✅ Thank you! Your M-Pesa donation has been confirmed.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Donate;
