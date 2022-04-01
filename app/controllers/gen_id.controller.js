const db = require("../models");
const gen_id = db.gen_id;

exports.findAll = (req, res) => {
  gen_id.find(
    { dateShort: { $in: req.query.dateShort }, type: { $in: req.query.type } },
    function (err, result) {
      if (err) {
        res.send({ message: "find all error" });
      } else {
        res.json(result);
      }
    }
  );
};
