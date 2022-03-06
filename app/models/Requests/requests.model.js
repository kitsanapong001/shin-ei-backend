const mongoose = require("mongoose");

const Requests = mongoose.model(
    "Requests",
    new mongoose.Schema(
        {
            request_number: String,
            item_Code: String,
            description: String,
            qty: Number,
            unit: String,
            unit_price: Number,
            unit_total: Number,
            date: { type: Date, default: Date.now }
        }
    )
);

module.exports = Requests;