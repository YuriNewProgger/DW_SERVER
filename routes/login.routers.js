const Router = require('express');
const router = new Router();
const loginController = require('../controllers/login.controller');


router.post('/login', loginController.getLogin);

module.exports = router;