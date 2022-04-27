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
    shipping: String,
    balance: String,
    requests: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
    },
    tranfer: [],
    date: { type: Date, default: Date.now },
    dateCreate: { type: Date, default: null },
  })
);

module.exports = Requests_job;
