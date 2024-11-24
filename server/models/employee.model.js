const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    f_id: {
      type: Number,
      required: true,
      unique: true,
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
      type: String,
    },
    f_gender: {
      type: String,
      enum: ["Male", "Female"],
      default: null,
    },
    f_designation: {
      type: String,
    },
    f_course: {
      type: String,
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
