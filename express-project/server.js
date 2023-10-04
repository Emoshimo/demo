const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cors = require("cors");
connectDb();

const app = express();

const port = process.env.PORT || 5000;

const allowedOrigins = ["https://euphonious-basbousa-bb0168.netlify.app/"];

// Allow requests from any origin
app.use(
  cors({
    origin: function (origin, callback) {
      // Check if the origin is allowed or is undefined (e.g., for same-origin requests)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// to parce json formatted data that is passed within body
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
