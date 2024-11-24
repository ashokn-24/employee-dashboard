const mongoose = require("mongoose");

const AuthSchema = mongoose.Schema(
  {
    f_no: {
      type: Number,
    },
    f_username: {
      type: String,
      required: true,
      unique: true,
    },
    f_password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Auth = mongoose.model("Auth", AuthSchema);

module.exports = Auth;
