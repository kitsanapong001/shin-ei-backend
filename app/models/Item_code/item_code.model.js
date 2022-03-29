const mongoose = require("mongoose");

const Item_Code = mongoose.model(
    "Item_Code",
    new mongoose.Schema(
        {
            item_code: String,
            description: String,
            dateCreate: { type: Date, default: null },
            dateUpdate: { type: Date, default: null },
        }
    )
);

module.exports = Item_Code;