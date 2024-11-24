const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./connectDB");
const authRoute = require("./routes/auth.route");
const empRoute = require("./routes/emp.route");
const upload = require("./utils/upload");
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// app.use(upload.single("image"));
app.use(express.static(__dirname + "/images"));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api/auth", authRoute);
app.use("/api/employee", empRoute);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
  connectDB();
});
