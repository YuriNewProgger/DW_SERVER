const Router = require('express');
const router = new Router();
const rentController = require('../controllers/rent.controller');

router.post('/registrRent', rentController.registrRent);
router.get('/getRents', rentController.getActiveRents);
router.post('/finishRent', rentController.finishRent);


module.exports = router;