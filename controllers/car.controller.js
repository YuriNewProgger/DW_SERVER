const carModel = require('../Models/Car.model');

class CarController {


    async getAllCars(request, response) {
        try {
            response.json(await carModel.GetCars());
        } 
        catch (error) {
            console.log(err);
            response.sendStatus(500);
        }
    }

    async addCar(request, response) {
        try {
            await carModel.Add({...request.body});
            response.json("Success");
        } 
        catch (error) {
            console.log(error);
            response.sendStatus(500);
        }
    }

    async deleteCar(request, response) {
        try {
            await carModel.Remove(request.body);
            response.sendStatus(200);
        } 
        catch (error) {
            console.log(error);
            response.sendStatus(500);
        }
    }

    async updateCar(request, response){
        try {
            await carModel.Update(request.body);
            response.sendStatus(200);
        } 
        catch (error) {
            console.log(error);
            response.sendStatus(500);
        }
    }
}

module.exports = new CarController();
