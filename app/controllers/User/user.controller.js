const db = require("../../models");
const User = db.user;
const Role = db.role;

var bcrypt = require("bcryptjs");

exports.findAll = (req, res) => {
  User.find({}, function (err, result) {
    if (err) {
      res.send({ message: "find all error" });
    } else {
      res.json(result);
    }
  }).populate("roles", "-__v");
};

exports.findOne = (req, res) => {
  User.findById(req.query.id, function (err, result) {
    if (err) {
      res.send({ message: "find all error" });
    } else {
      res.json(result);
    }
  }).populate("roles", "-__v");
};

exports.delete = (req, res) => {
  User.findByIdAndDelete(req.body.id, function (err, docs) {
    if (err) {
      console.log(err);
      res.send({ message: "delete error" });
    } else {
      console.log("Deleted : ", docs);
      res.send({ message: "Delete User successfully !" });
    }
  });
};

exports.update = (req, res) => {
  User.findByIdAndUpdate(
    req.body.id,
    {
      email: req.body.email,
      //   password: bcrypt.hashSync(req.body.password, 8),
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    },
    function (err, user) {
      if (err) {
        console.log(err);
        res.send({ message: "update error" });
      } else {
        if (req.body.roles) {
          Role.find(
            {
              name: { $in: req.body.roles },
            },
            (err, roles) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
              if (req.body.password != "") {
                user.password = bcrypt.hashSync(req.body.password, 8);
              }
              user.roles = roles.map((role) => role._id);
              user.save((err) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
              });
            }
          );
        }
        // console.log("Updated User : ", user);
        res.send({ message: "update user successfully !" });
      }
    }
  );
};

exports.createUser = (req, res) => {
  console.log(req.body);
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};
