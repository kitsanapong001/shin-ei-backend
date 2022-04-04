const { job } = require("../../models");
const db = require("../../models");
const Requests = db.requests;
const Requests_job = db.requests_job;

exports.createRequests = async (req, res) => {
  console.log(req.body.requests);
  // return;
  const requests = new Requests({
    request_number: req.body.requests.request_number,
    date: req.body.requests.date,
    request_by: req.body.requests.request_by,
  });
  var errLog = 0;
  await requests.save((errRq, last_id) => {
    if (errRq) {
      errLog++;
      return;
    }
    if (last_id) {
      req.body.requests.job.forEach((element, index) => {
        const requests_job = new Requests_job({
          item_code: element.item_code,
          description: element.description,
          qty: element.qty,
          unit: element.unit,
          unit_price: element.unit_price,
          unit_total: element.unit_total,
          shipping: element.shipping,
          balance: element.balance,
          requests: last_id._id,
          tranfer: element.tranfer,
        });
        requests_job.save((errJob, job_id) => {
          if (errJob) {
            errLog++;
            return;
          } else {
            Requests.findByIdAndUpdate(
              last_id,
              { $push: { job: job_id } },
              function (err, docs) {
                if (err) {
                  errStatus++;
                  // console.log(err);
                }
              }
            );
          }
        });
      });
    }

    if (errLog > 0) {
      res.send({ message: "Create requests error !" });
    } else {
      res.send({ message: "Create requests successfully !" });
    }
  });
};

exports.findAll = (req, res) => {
  Requests.find({}, function (err, result) {
    if (err) {
      res.send({ message: "find all error" });
    } else {
      // console.log(result);
      res.json(result);
    }
  });
};

exports.delete = (req, res) => {
  Requests.findByIdAndDelete(req.body.id, function (err, docs) {
    if (err) {
      // console.log(err);
      res.send({ message: "delete error" });
    } else {
      // console.log("Deleted : ", docs);
      res.send({ message: "Delete requests successfully !" });
    }
  });
};

exports.update = (req, res) => {
  var errStatus = 0;
  // console.log(req.body.requests);
  Requests.findByIdAndUpdate(
    req.body.requests._id,
    {
      request_number: req.body.requests.request_number,
      date: req.body.requests.date,
      request_by: req.body.requests.request_by,
    },
    function (err, docs) {
      if (err) {
        errStatus++;
        // console.log(err);
      } else {
        // delete
        req.body.requests.deleteTemp.forEach((element) => {
          // delete request job
          Requests_job.findByIdAndDelete(element, function (err, docs) {
            if (err) {
              errStatus++;
              console.log(err);
            }
          });
          // delete in array job
          Requests.findByIdAndUpdate(
            req.body.requests._id,
            { $pull: { job: element } },
            function (err, docs) {
              if (err) {
                errStatus++;
                // console.log(err);
              }
            }
          );
        });

        // update request job
        req.body.requests.job.forEach((element) => {
          if (element._id) {
            Requests_job.findByIdAndUpdate(
              element._id,
              {
                item_code: element.item_code,
                description: element.description,
                qty: element.qty,
                unit: element.unit,
                unit_price: element.unit_price,
                unit_total: element.unit_total,
                shipping: element.shipping,
                balance: element.balance,
                tranfer: element.tranfer,
              },
              function (errJob, docsJob) {
                if (errJob) {
                  errStatus++;
                }
              }
            );
          } else {
            const requests_job = new Requests_job({
              item_code: element.item_code,
              description: element.description,
              qty: element.qty,
              unit: element.unit,
              unit_price: element.unit_price,
              unit_total: element.unit_total,
              shipping: element.shipping,
              balance: element.balance,
              requests: req.body.requests._id,
              tranfer: element.tranfer,
            });
            requests_job.save((errJob, job_id) => {
              if (errJob) {
                errStatus++;
                return;
              } else {
                Requests.findByIdAndUpdate(
                  req.body.requests._id,
                  { $push: { job: job_id } },
                  function (err, docs) {
                    if (err) {
                      errStatus++;
                      // console.log(err);
                    }
                  }
                );
              }
            });
          }
        });
        if (errStatus > 0) {
          res.send({ message: "update error" });
        } else {
          // console.log("Updated request : ", docs);
          res.send({ message: "update requests successfully !" });
        }
      }
    }
  );
};

exports.getByRequest = (req, res) => {
  Requests.findById(req.query.id, function (err, result) {
    if (err) {
      res.send({ message: "find all error" });
    } else {
      res.json(result);
    }
  });
};

exports.getRequests_job = (req, res) => {
  // console.log(req.query.id);
  Requests_job.find({ _id: { $in: req.query.id } }, function (err, result) {
    if (err) {
      res.send({ message: "find all error" });
    } else {
      res.json(result);
    }
  });
};
