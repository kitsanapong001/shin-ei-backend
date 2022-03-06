const db = require("../../models");
const RequestsID = db.request_ID

// Create and Save a new Item code
exports.createRequestsID = (req, res) => {
    const requestsID = new RequestsID ({
            request_number: req.body.request_number,
            date: req.body.date,
    });
    requestsID.save(err => {
        if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "Create requestsID successfully !" });
    })
  
};

// Retrieve all Item code from the database.
exports.findAll = (req, res) => {

    RequestsID.find({}, function(err, result) {
        if (err) {
            res.send({ message: "find all error" });
        } else {
          res.json(result);
        }
      });
};

// exports.delete = (req, res) => {
//     RequestsID.findByIdAndDelete(req.body.id, function (err, docs) {
//         if (err){
//             console.log(err)
//             res.send({ message: "delete error" });
//         }
//         else{
//             console.log("Deleted : ", docs);
//             res.send({ message: "Delete requests successfully !" });
//         }
//     });
// }

// exports.update = (req, res) => {
//     RequestsID.findByIdAndUpdate(req.body.id , 
//         { 
//             request_number: req.body.request_number,
//             item_Code: req.body.item_Code,
//             description: req.body.description,
//             qty: req.body.qty,
//             unit: req.body.unit,
//             unit_price: req.body.unit_price,
//             unit_total: req.body.unit_total,
//             date: req.body.date
//         },
//         function (err, docs) {
//             if (err){
//                 console.log(err)
//                 res.send({ message: "update error" });
//             }
//             else{
//                 console.log("Updated User : ", docs);
//                 res.send({ message: "update requests successfully !" });
//             }
//         }
//     );
// };