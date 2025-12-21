require("dotenv").config();
console.log("DEBUG: DATABASE_URL is:", process.env.DATABASE_URL);
const express = require("express");
const cors = require("cors");

const authRoutes = require("./src/routes/auth.routes");
const jobRoutes = require("./src/routes/job.routes");
const referralRoutes = require('./src/routes/referral.routes');
const messageRoutes = require('./src/routes/message.routes');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use('/api', jobRoutes);
app.use('/api/referrals', referralRoutes);
app.use('/api/messages', messageRoutes);
app.get("/", (req, res) => {
  res.send("CircleHire API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
