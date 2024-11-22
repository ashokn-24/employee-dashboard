const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./connectDB");
const authRoute = require("./routes/auth.route");
const empRoute = require("./routes/emp.route");
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use("/api/auth", authRoute);
app.use("/api/employee", empRoute);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
  connectDB();
});
