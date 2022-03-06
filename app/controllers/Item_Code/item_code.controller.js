const db = require("../../models");
const Item_Code = db.item_code

// Create and Save a new Item code
exports.createItem = (req, res) => {

    const item = new Item_Code ({
        item_code: req.body.item_code,
        description: req.body.description,
    });

    item.save(err => {
        if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "Create item code successfully !" });
    })
  
};

// Retrieve all Item code from the database.
exports.findAll = (req, res) => {

    Item_Code.find({}, function(err, result) {
        if (err) {
            res.send({ message: "find all error" });
        } else {
          res.json(result);
        }
      });
};

exports.delete = (req, res) => {
    Item_Code.findByIdAndDelete(req.body.id, function (err, docs) {
        if (err){
            console.log(err)
            res.send({ message: "delete error" });
        }
        else{
            console.log("Deleted : ", docs);
            res.send({ message: "Delete item code successfully !" });
        }
    });
}


exports.update = (req, res) => {
    Item_Code.findByIdAndUpdate(req.body.id , { item_code: req.body.item_code, description:req.body.description },
        function (err, docs) {
            if (err){
                console.log(err)
                res.send({ message: "update error" });
            }
            else{
                console.log("Updated User : ", docs);
                res.send({ message: "update successfully !" });
            }
        }
    );
};