const Router = require('express');
const router = new Router();
const carController = require('../controllers/car.controller');


router.get('/allCars', carController.getAllCars);
router.post('/addCar', carController.addCar);


module.exports = router;