const db = require("../../models");
const Requests = db.requests

// Create and Save a new Item code
exports.createRequests = (req, res) => {

    const requests = new Requests ({
            request_number: req.body.request_number,
            item_Code: req.body.item_Code,
            description: req.body.description,  
            qty: req.body.qty,
            unit: req.body.unit,
            unit_price: req.body.unit_price,
            unit_total: req.body.unit_total,
            date: req.body.date,
    });

    requests.save(err => {
        if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "Create requests successfully !" });
    })
  
};

// Retrieve all Item code from the database.
exports.findAll = (req, res) => {

    Requests.find({}, function(err, result) {
        if (err) {
            res.send({ message: "find all error" });
        } else {
          res.json(result);
        }
      });
};

exports.delete = (req, res) => {
    Requests.findByIdAndDelete(req.body.id, function (err, docs) {
        if (err){
            console.log(err)
            res.send({ message: "delete error" });
        }
        else{
            console.log("Deleted : ", docs);
            res.send({ message: "Delete requests successfully !" });
        }
    });
}

exports.update = (req, res) => {
    Requests.findByIdAndUpdate(req.body.id , 
        { 
            request_number: req.body.request_number,
            item_Code: req.body.item_Code,
            description: req.body.description,
            qty: req.body.qty,
            unit: req.body.unit,
            unit_price: req.body.unit_price,
            unit_total: req.body.unit_total,
            date: req.body.date
        },
        function (err, docs) {
            if (err){
                console.log(err)
                res.send({ message: "update error" });
            }
            else{
                console.log("Updated User : ", docs);
                res.send({ message: "update requests successfully !" });
            }
        }
    );
};

exports.getByRequest = (req, res) => {
    let RequestID = req.body.request_number;
    console.log('hi',req.body);
    Requests.find({request_number: RequestID}, function(err, result) {
        if (err) {
            res.send({ message: "find By Request err" });
        } else {
          res.json(result);
        }
    });

}