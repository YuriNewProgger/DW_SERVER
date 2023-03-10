const Router = require('express');
const router = new Router();
const usersController = require('../controllers/users.controller');


router.get('/allUsers', usersController.getAllUsers);
router.post('/updateUser', usersController.updateUser);
router.post('/deleteUser', usersController.deleteUser);
router.post('/getAuthUser', usersController.getAuthUser);
router.post('/getHistory', usersController.getAllRents);


module.exports = router;