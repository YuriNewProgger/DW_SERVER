const db = require('../db');

class CarModel{

    async GetCars(){
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

        return responseCars;
    }

    async Add(paramsCar){

        const { title, price, photo, discription, typeCar } = paramsCar;

        const _price = parseFloat(price);
        const _idTypeCar = parseInt(typeCar);

        await db.query(`INSERT INTO cars (title, price, photo, discription, id_type_car) 
        VALUES('${title}', ${_price}, '${photo}', '${discription}', ${_idTypeCar});`);

    }

    async Remove(paramsCar){
        await db.query(`DELETE FROM cars WHERE id=${paramsCar.id}`);
    }

    async Update(paramsCar){
        const { id, discription, photo, price, title, type } = paramsCar;

        db.query(`
            UPDATE cars 
            SET title='${title}', price=${parseFloat(price)}, photo='${photo}', discription='${discription}', id_type_car=${parseInt(type)} 
            WHERE id=${id};`
        );
    }
}

module.exports = new CarModel();