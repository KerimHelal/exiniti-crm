const leadsController = require("../controllers/leads.controllers");

module.exports = app => {
  app.get('/leads/getAll', leadsController.getAllLeads);
  app.post('/leads/delete', leadsController.deleteLead);
  app.put('/leads/update', leadsController.updateLead);
  app.post('/leads/update', leadsController.insertLead);

};
