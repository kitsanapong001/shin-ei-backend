const mongoose = require("mongoose");

const RequestsID = mongoose.model(
    "Request_ID",
    new mongoose.Schema(
        {  
            request_number: String,
            date: { type: Date, default: Date.now }
        }
    )
);

module.exports = RequestsID;