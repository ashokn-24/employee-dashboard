const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    f_id: {
      type: String,
      required: true,
    },
    f_image: {
      type: String,
    },
    f_name: {
      type: String,
    },
    f_email: {
      type: String,
    },
    f_mobile: {
      type: Number,
    },
    f_gender: {
      type: String,
      enum: ["Male", "Female"],
      default: "",
    },
    f_designation: {
      type: String,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
