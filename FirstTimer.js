const mongoose = require("mongoose");

const firstTimerSchema = new mongoose.Schema({
  name: String,
  gender: String,
  occupation: String,
  contactAddress: String,
  telephone: String,
  email: String,
  bornAgain: String,
  hearAboutChurch: String,
  others: String,
  age: String,
  remarks: String,
});

module.exports = mongoose.model("FirstTimer", firstTimerSchema);
