const Router = require('express');
const router = new Router();
const registrController = require('../controllers/registr.controller');


router.post('/reg', registrController.registration);

module.exports = router;