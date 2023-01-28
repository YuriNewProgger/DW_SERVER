const db = require('../db');

class RentController {

    async registrRent(request, response) {
        try {
            const { id_car, id_user, start_date, end_date, is_compleate, total_price } = request.body;

            const _isCompleated = await db.query(`select is_compleate from rents where id_car = ${id_car} and id_user = ${id_user} order by end_date desc `);

            console.log(_isCompleated.rows);
            if(_isCompleated.rows.length > 0){
                response.sendStatus(400);
                return;
            }

            await db.query(`INSERT INTO rents (id_car, id_user, start_date, end_date, is_compleate, total_price) 
            VALUES(${parseInt(id_car)}, ${id_user}, '${start_date}', '${end_date}', ${is_compleate}, ${parseInt(total_price)});`)
            
            response.sendStatus(200);
        }
        catch (err) {
            console.log(err);
            response.sendStatus(500);
        }

    }
}

module.exports = new RentController();