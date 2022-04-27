const mongoose = require("mongoose");

const Request = mongoose.model(
  "Request",
  new mongoose.Schema({
    request_number: String,
    date: { type: Date, default: Date.now },
    request_by: String,
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Requests_job",
    },
    dateCreate: { type: Date, default: null },
  })
);

module.exports = Request;
