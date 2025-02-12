const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");
require("dotenv").config(); // Load environment variables

admin.initializeApp();
const db = admin.firestore();

exports.generateInvoice = functions.firestore
  .document("bookings/{bookingId}")
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();

    // Check if status changed to "finished"
    if (before.status !== "finished" && after.status === "finished") {
      const { name, totalBookingAmount, state } = after;

      // Calculate GST
      const GST_RATE = 18; // Example GST rate (18%)
      const gstAmount = (totalBookingAmount * GST_RATE) / 100;
      let igst = 0, sgst = 0, cgst = 0;

      if (state === "Delhi") {
        sgst = gstAmount / 2;
        cgst = gstAmount / 2;
      } else {
        igst = gstAmount;
      }

      const invoiceData = {
        name,
        totalBookingAmount,
        gstAmount,
        igst,
        sgst,
        cgst,
        status: "generated",
        timestamp: admin.firestore.Timestamp.now()
      };

      // Store invoice in Firestore
      await db.collection("invoices").add(invoiceData);

      // Send invoice to GST API
      await sendToGSTAPI(invoiceData);
    }
  });

// Function to send invoice data to GST API
async function sendToGSTAPI(invoiceData) {
  try {
    const response = await axios.post(process.env.GST_API_URL, invoiceData, {
      headers: {
        Authorization: `Bearer ${process.env.GST_API_KEY}`,
        "Content-Type": "application/json"
      }
    });
    console.log("GST API Response:", response.data);
  } catch (error) {
    console.error("Error sending data to GST API:", error.response?.data || error);
  }
}