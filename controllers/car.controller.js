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

    async deleteCar(request, response) {
        const { id } = request.body;
        try {
            await db.query(`DELETE FROM cars WHERE id=${id}`);
            response.sendStatus(200);
        }
        catch (err) {
            console.log(err);
            response.sendStatus(500);
        }
    }

    async updateCar(request, response){
        const { id, discription, photo, price, title, type } = request.body;

        const _price = parseFloat(price);
        const _idTypeCar = parseInt(type);

        try{
            db.query(`UPDATE cars SET title='${title}', price=${_price}, photo='${photo}', discription='${discription}', id_type_car=${_idTypeCar} WHERE id=${id};`)
        }
        catch(err){
            console.log(err);
            response.sendStatus(500);
            return;
        }
        
        

        response.sendStatus(200);
    }
}

module.exports = new CarController();
