const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must provide name"],
    trim: true,
    maxLength: [12, "Name cannot be longer than 12 characters"],
  },
  verified: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
