const db = require("../../models");
const Job = db.job;
const Gen_ID = db.gen_id;
const Requests = db.requests;
const Requests_job = db.requests_job;

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
    posrno2: req.body.job.posrno2,
    posrno3: req.body.job.posrno3,
    qty: req.body.job.qty,
    unit: req.body.job.unit,
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
    ssrrc: req.body.job.ssrrc,
    remark: req.body.job.remark,
    shipping: req.body.job.shipping,
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

exports.getJobChart = (req, res) => {
  var valResult = {
    job: { jobTotal: 0, jobSuccess: 0, jobBalance: 0 },
    request: { requestTotal: 0, requestSuccess: 0, requestBalance: 0 },
    dataLineJob: [],
    dataLineRequest: [],
  };

  Requests.find({}, function (errRequestTotal, resultRequestTotal) {
    valResult.request.requestTotal = resultRequestTotal;
    // success request
    Requests_job.find(
      { balance: "0" },
      function (errJobSuccess, resultRequestSuccess) {
        valResult.request.requestSuccess = resultRequestSuccess.length;
        // balance request
        Requests_job.find(
          { balance: { $gt: "0" } },
          function (errJobSuccess, resultRequestBalance) {
            valResult.request.requestBalance = resultRequestBalance.length;
            // total job
            Job.find({}, function (errJobTotal, resultJobTotal) {
              valResult.job.jobTotal = resultJobTotal;
              // success job
              Job.find(
                { balance: "0" },
                function (errJobSuccess, resultJobSuccess) {
                  valResult.job.jobSuccess = resultJobSuccess.length;
                  // balancejob
                  Job.find(
                    { balance: { $gt: "0" } },
                    function (errJobSuccess, resultJobBalance) {
                      valResult.job.jobBalance = resultJobBalance.length;
                      // dataLineJob
                      for (let index = 0; index < 12; index++) {
                        Job.find({}, function (errdataLine, resultDataLineJob) {
                          valResult.dataLineJob[index] = resultDataLineJob;
                        })
                          .find({
                            $expr: {
                              $and: [
                                { $eq: [{ $year: "$date" }, 2022] },
                                { $eq: [{ $month: "$date" }, index + 1] },
                              ],
                            },
                          })
                          .count();
                      }
                      // dataLineRequest
                      for (let index = 0; index < 12; index++) {
                        Requests.find(
                          {},
                          function (errDataLineRq, resultDataLineRq) {
                            valResult.dataLineRequest[index] = resultDataLineRq;
                          }
                        )
                          .find({
                            $expr: {
                              $and: [
                                { $eq: [{ $year: "$date" }, 2022] },
                                { $eq: [{ $month: "$date" }, index + 1] },
                              ],
                            },
                          })
                          .count();
                      }
                      setTimeout(() => {
                        res.json(valResult);
                      }, 4000);
                    }
                  );
                }
              );
            }).count();
          }
        );
      }
    );
  }).count();
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
      posrno2: req.body.job.posrno2,
      posrno3: req.body.job.posrno3,
      qty: req.body.job.qty,
      unit: req.body.job.unit,
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
      ssrrc: req.body.job.ssrrc,
      remark: req.body.job.remark,
      shipping: req.body.job.shipping,
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
