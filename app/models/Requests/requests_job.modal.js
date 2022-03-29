const mongoose = require("mongoose");

const Requests_job = mongoose.model(
  "Requests_job",
  new mongoose.Schema({
    item_code: String,
    description: String,
    qty: String,
    unit: String,
    unit_price: String,
    unit_total: String,
    requests: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
    },
  })
);

module.exports = Requests_job;
