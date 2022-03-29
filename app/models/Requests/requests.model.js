const mongoose = require("mongoose");

const Request = mongoose.model(
  "Request",
  new mongoose.Schema({
    request_number: String,
    date: { type: Date, default: Date.now },
  })
);

module.exports = Request;
