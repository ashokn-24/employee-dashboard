const express = require("express");
const {
  createEmployer,
  updateEmployer,
  getEmployeeById,
  getAllEmployees,
  deleteEmployee,
} = require("../controllers/emp.controller");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname.toLowerCase()}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/create", upload.single("image"), createEmployer);
router.put("/update/:id", upload.single("image"), updateEmployer);
router.delete("/delete/:id", deleteEmployee);
router.get("/get/:id", getEmployeeById);
router.get("/get-all", getAllEmployees);

module.exports = router;
