const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, text }) => {
  try {
    // Transporter setup with Gmail App Password
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Gmail address
        pass: process.env.EMAIL_PASS, // Gmail App Password (NOT normal password)
      },
    });

    const mailOptions = {
      from: `"ReferX" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);
  } catch (error) {
    console.error("❌ Failed to send email:", error.message);
  }
};

module.exports = sendEmail;
