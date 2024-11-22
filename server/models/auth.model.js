const mongoose = require("mongoose");

const AuthSchema = mongoose.Schema(
  {
    f_no: {
      type: Number,
    },
    f_username: {
      type: String,
    },
    f_password: {
      type: String,
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("AuthSchema", AuthSchema);
