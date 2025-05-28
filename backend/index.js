const express = require("express")
const nodemailer = require("nodemailer")
const cors = require("cors")
require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  })

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: "New Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  }

  try {
    await transporter.sendMail(mailOptions)
    res.status(200).send("Email sent")
  } catch (err) {
    res.status(500).send("Failed to send email")
  }
})

app.listen(5000, () => console.log("Server running on port 5000"))