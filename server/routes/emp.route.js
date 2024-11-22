const express = require("express");
const { getAllEmployers } = require("../controllers/emp.controller");

const router = express.Router();

router.get("/", getAllEmployers);

module.exports = router;
