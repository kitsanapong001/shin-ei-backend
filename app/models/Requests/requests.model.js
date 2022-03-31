const mongoose = require("mongoose");

const Request = mongoose.model(
  "Request",
  new mongoose.Schema({
    request_number: String,
    date: { type: Date, default: Date.now },
    request_by: String,
  })
);

module.exports = Request;
