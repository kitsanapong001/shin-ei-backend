const db = require("../../models");
const Job = db.job;
const Gen_ID = db.gen_id;

// Create and Save a new Item code
exports.createJob = (req, res) => {
  const job = new Job({
    job_number: req.body.job.job_number,
    date: req.body.job.date,
    request_by: req.body.job.request_by,
    request_id: req.body.job.request_id,
    supplier: req.body.job.supplier,
    supplier_other: req.body.job.supplier_other,
    customer: req.body.job.customer,
    customer_other: req.body.job.customer_other,
    item_code: req.body.job.item_code,
    tool_name: req.body.job.tool_name,
    posrno: req.body.job.posrno,
    qty: req.body.job.qty,
    tool_type: req.body.job.tool_type,
    dwg_number: req.body.job.dwg_number,
    request_delivery_date: req.body.job.request_delivery_date,
    item_code_new: req.body.job.item_code_new,
    item_code_new_other: req.body.job.item_code_new_other,
    item_code_repair: req.body.job.item_code_repair,
    item_code_repair_other: req.body.job.item_code_repair_other,
    type_work: req.body.job.type_work,
    material: req.body.job.material,
    material_detail: req.body.job.material_detail,
    cost_nava_sura: req.body.job.cost_nava_sura,
    cost_supplier: req.body.job.cost_supplier,
    cost_sht_wn: req.body.job.cost_sht_wn,
    cost: req.body.job.cost,
    amount: req.body.job.amount,
    total_cost: req.body.job.total_cost,
    production: req.body.job.production,
    balance: req.body.job.balance,
    first_qty: req.body.job.first_qty,
    first_date: req.body.job.first_date,
    first_taninvdo: req.body.job.first_taninvdo,
    second_qty: req.body.job.second_qty,
    second_date: req.body.job.second_date,
    second_taninvdo: req.body.job.second_taninvdo,
    third_qty: req.body.job.third_qty,
    third_date: req.body.job.third_date,
    third_taninvdo: req.body.job.third_taninvdo,
  });

  job.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    // add gen_id
    const genID = new Gen_ID({
      type: req.body.gen_id.type,
      dateShort: req.body.gen_id.dateShort,
      number: req.body.gen_id.number,
      job_number: req.body.gen_id.job_number,
      dateAt: (dateTime = new Date()),
    });
    genID.save((err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
    });

    res.send({ message: "Create job successfully !" });
  });
};

exports.findAll = (req, res) => {
  Job.find({}, function (err, result) {
    if (err) {
      res.send({ message: "find all error" });
    } else {
      res.json(result);
    }
  });
};

exports.findOne = (req, res) => {
  Job.findById(req.query.id, function (err, result) {
    if (err) {
      res.send({ message: "find all error" });
    } else {
      res.json(result);
    }
  });
};

exports.delete = (req, res) => {
  Job.findByIdAndDelete(req.body.id, function (err, docs) {
    if (err) {
      console.log(err);
      res.send({ message: "delete error" });
    } else {
      console.log("Deleted : ", docs);
      res.send({ message: "Delete JOB successfully !" });
    }
  });
};

exports.update = (req, res) => {
  Job.findByIdAndUpdate(
    req.body.job._id,
    {
      job_number: req.body.job.job_number,
      date: req.body.job.date,
      request_by: req.body.job.request_by,
      request_id: req.body.job.request_id,
      supplier: req.body.job.supplier,
      supplier_other: req.body.job.supplier_other,
      customer: req.body.job.customer,
      customer_other: req.body.job.customer_other,
      item_code: req.body.job.item_code,
      tool_name: req.body.job.tool_name,
      posrno: req.body.job.posrno,
      qty: req.body.job.qty,
      tool_type: req.body.job.tool_type,
      dwg_number: req.body.job.dwg_number,
      request_delivery_date: req.body.job.request_delivery_date,
      item_code_new: req.body.job.item_code_new,
      item_code_new_other: req.body.job.item_code_new_other,
      item_code_repair: req.body.job.item_code_repair,
      item_code_repair_other: req.body.job.item_code_repair_other,
      type_work: req.body.job.type_work,
      material: req.body.job.material,
      material_detail: req.body.job.material_detail,
      cost_nava_sura: req.body.job.cost_nava_sura,
      cost_supplier: req.body.job.cost_supplier,
      cost_sht_wn: req.body.job.cost_sht_wn,
      cost: req.body.job.cost,
      amount: req.body.job.amount,
      total_cost: req.body.job.total_cost,
      production: req.body.job.production,
      balance: req.body.job.balance,
      first_qty: req.body.job.first_qty,
      first_date: req.body.job.first_date,
      first_taninvdo: req.body.job.first_taninvdo,
      second_qty: req.body.job.second_qty,
      second_date: req.body.job.second_date,
      second_taninvdo: req.body.job.second_taninvdo,
      third_qty: req.body.job.third_qty,
      third_date: req.body.job.third_date,
      third_taninvdo: req.body.job.third_taninvdo,
    },
    function (err, docs) {
      if (err) {
        console.log(err);
        res.send({ message: "update error" });
      } else {
        console.log("Updated User : ", docs);
        res.send({ message: "update JOB successfully !" });
      }
    }
  );
};
