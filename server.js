const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path"); // <- this was missing!

const app = express();
const PORT = 5000;
require("dotenv").config(); // keep it on top

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname)); // to serve index.html, CSS, JS, etc.

// Route to handle form submissions
app.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send("All fields are required.");
  }

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "stikermukeshkumar@gmail.com", // your Gmail
      pass: "gqei aysd gatb ryzk",    // Gmail App Password
    },
  });

  let mailOptions = {
    from: `"${name}" <${email}>`,
    to: "stikermukeshkumar@gmail.com",
    subject: "Portfolio Contact Form",
    text: message,
    html: `<h3>New message from Portfolio</h3>
           <p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Message:</strong><br>${message}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send("Message sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send message.");
  }
});

// Serve the HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
