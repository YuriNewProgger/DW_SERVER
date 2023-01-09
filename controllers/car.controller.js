const db = require('../db');

class CarController {


    async getAllCars(request, response) {

        const listCar = await db.query("SELECT * FROM cars");
        const listTypeCars = await db.query("SELECT * FROM typescar");

        const responseCars = {
            allCars: [],
            allTypes: listTypeCars.rows
        };

        listCar.rows.forEach(element => {
            const type = listTypeCars.rows.find(item => item.id === element.id_type_car);
            const car = { ...element, type };
            responseCars.allCars.push(car);
        })


        response.json(responseCars);
    }

    async addCar(request, response) {
        const { title, price, photo, discription, typeCar } = request.body;

        const _price = parseFloat(price);
        const _idTypeCar = parseInt(typeCar);


        try {
            await db.query(`INSERT INTO cars (title, price, photo, discription, id_type_car) 
            VALUES('${title}', ${_price}, '${photo}', '${discription}', ${_idTypeCar});`);
        }
        catch (err) {
            console.log(err);
            response.status(500);
            response.send('Bad');
            return;
        }

        response.json("Success");
    }
}

module.exports = new CarController();
