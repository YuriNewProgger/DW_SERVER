const Router = require('express');
const router = new Router();
const usersController = require('../controllers/users.controller');


router.get('/allUsers', usersController.getAllUsers);
router.post('/updateUser', usersController.updateUser);


module.exports = router;