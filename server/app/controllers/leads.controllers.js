const Leads = require("../collections/leads");

exports.getAllLeads = (req, res) => {
  Leads.find({}).exec((err, users) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({
        users: users
      });
  })
};

exports.insertLead = (req, res) => {
    const lead = new Leads({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
    });
  
  
    lead.save((err, lead) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      } else {
          res.send({ message: "Lead was added successfully!" });
      } 
    });
  };

exports.deleteLead = (req, res) => {
    Leads.deleteOne(req.id, (err) => {
        if (err) {
            res.status(500).send({ message: err });
        } else {
          res.send({ message: "Lead deleted successfuly" });
        }
      });
  };

  exports.updateLead = (req, res) => {
    Leads.update({ _id: req.lead._id }, { $set: req.lead }, (err) => {
      if (err) {
        res.status(500).send({ message: err });
      } else {
        res.send({ message: "Lead updated successfuly" });
      }
    });
  };

