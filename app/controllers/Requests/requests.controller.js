const db = require("../../models");
const Requests = db.requests;
const Requests_job = db.requests_job;

exports.createRequests = (req, res) => {
  const requests = new Requests({
    request_number: req.body.request_number,
    date: req.body.date,
    request_by: req.body.request_by,
  });
  var errLog = 0;
  requests.save((errRq, last_id) => {
    if (errRq) {
      errLog++;
      return;
    }
    if (last_id) {
      req.body.job.forEach((element, index) => {
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
        });
        requests_job.save((errJob) => {
          if (errJob) {
            errLog++;
            return;
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
      console.log(result);
      res.json(result);
    }
  });
};

exports.delete = (req, res) => {
  Requests.findByIdAndDelete(req.body.id, function (err, docs) {
    if (err) {
      console.log(err);
      res.send({ message: "delete error" });
    } else {
      console.log("Deleted : ", docs);
      res.send({ message: "Delete requests successfully !" });
    }
  });
};

exports.update = (req, res) => {
  var errStatus = 0;
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
        console.log(err);
      } else {
        req.body.requests.job.forEach((element) => {
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
            },
            function (errJob, docsJob) {
              if (errJob) {
                errStatus++;
              }
            }
          );
        });
        if (errStatus > 0) {
          res.send({ message: "update error" });
        } else {
          console.log("Updated request : ", docs);
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
  Requests_job.find(
    { requests: { $in: req.query.id } },
    function (err, result) {
      if (err) {
        res.send({ message: "find all error" });
      } else {
        res.json(result);
      }
    }
  );
};
