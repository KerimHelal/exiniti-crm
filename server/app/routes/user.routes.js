const usersController = require("../controllers/users.controller");

module.exports = app => {
  app.get('/users/getAll', usersController.getAllUsers);
  app.post('/users/delete', usersController.deleteUser);
  app.put('/users/update', usersController.updateUser);
};
