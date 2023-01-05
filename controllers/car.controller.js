const db = require('../db');

class CarController{


    async getAllCars(request, response){

        const listCar = await db.query("SELECT * FROM cars");
        const listTypeCars = await db.query("SELECT * FROM typescar");

        const responseCars = [];

        listCar.rows.forEach(element => {
            const type = listTypeCars.rows.find(item => item.id === element.id_type_car);
            const car = {...element, type};
            responseCars.push(car);
        })


        response.json(responseCars);
    }
}

module.exports = new CarController();