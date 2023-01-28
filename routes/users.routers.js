const Router = require('express');
const router = new Router();
const usersController = require('../controllers/users.controller');


router.get('/allUsers', usersController.getAllUsers);


module.exports = router;