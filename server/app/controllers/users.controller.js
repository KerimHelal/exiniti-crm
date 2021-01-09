const Users = require("../collections/users");

exports.getAllUsers = (req, res) => {
  Users.find({}).exec((err, users) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({
        users: users
      });
  })
};

exports.deleteUser = (req, res) => {
    Users.deleteOne(req.id, (err) => {
        if (err) {
            res.status(500).send({ message: err });
        } else {
          res.send({ message: "User deleted successfuly" });
        }
      });
  };

  exports.updateUser = (req, res) => {
    Users.update({ _id: req.user._id }, { $set: req.user }, (err) => {
      if (err) {
        res.status(500).send({ message: err });
      } else {
        res.send({ message: "User updated successfuly" });
      }
    });
  };

