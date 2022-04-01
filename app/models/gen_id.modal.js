const mongoose = require("mongoose");

const gen_id = mongoose.model(
  "gen_id",
  new mongoose.Schema({
    type: String,
    dateShort: String,
    number: String,
    job_number: String,
    dateAt: { type: Date, default: Date.now },
  })
);

module.exports = gen_id;
