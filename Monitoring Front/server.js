const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000; // Or any other port you prefer

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "boulekhrasfadwa@gmail.com",
    pass: "TREF56789@gh",
  },
});

// Endpoint for sending emails
app.post("/send-email", async (req, res) => {
  const { recipient, subject, body } = req.body;

  const mailOptions = {
    from: "boulekhrasfadwa@gmail.com",
    to: recipient,
    subject: subject,
    text: body,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
