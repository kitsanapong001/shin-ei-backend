const mongoose = require("mongoose");

const Item_Code = mongoose.model(
    "Item_Code",
    new mongoose.Schema(
        {
            item_code: String,
            description: String
        }
    )
);

module.exports = Item_Code;