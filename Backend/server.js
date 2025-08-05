require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./src/routes/auth.routes");
const jobRoutes = require("./src/routes/job.routes");
const referralRoutes = require('./src/routes/referral.routes');
//const reviewRoutes = require("./src/routes/reviews");


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/referrals', referralRoutes);
// app.use("/api/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.send("CircleHire API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
