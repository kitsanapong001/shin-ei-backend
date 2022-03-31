const mongoose = require("mongoose");

const Job = mongoose.model(
  "Job",
  new mongoose.Schema({
    job_number: String,
    date: { type: Date, default: null },
    request_by: String,
    request_id: String,
    supplier: String,
    supplier_other: String,
    customer: String,
    customer_other: String,
    item_code: String,
    tool_name: String,
    posrno: String,
    qty: String,
    tool_type: String,
    dwg_number: String,
    request_delivery_date: { type: Date, default: null },
    item_code_new: String,
    item_code_new_other: String,
    item_code_repair: String,
    item_code_repair_other: String,
    type_work: String,
    material: String,
    material_detail: String,
    cost_nava_sura: String,
    cost_supplier: String,
    cost_sht_wn: String,
    cost: String,
    amount: String,
    total_cost: String,
    production: String,
    balance: String,
    first_qty: String,
    first_date: { type: Date, default: null },
    first_taninvdo: String,
    second_qty: String,
    second_date: { type: Date, default: null },
    second_taninvdo: String,
    third_qty: String,
    third_date: { type: Date, default: null },
    third_taninvdo: String,

  })
);

module.exports = Job;
