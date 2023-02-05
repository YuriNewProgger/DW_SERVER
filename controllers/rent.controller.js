const db = require('../db');
const moment = require('moment');

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

            const originalPrice = await db.query(`select price  from cars where id = ${id_car}`);
            let firstDate = moment(start_date, "YYYY-MM-DD");
            let secondDate = moment(end_date, "YYYY-MM-DD");
            let days = secondDate.diff(firstDate, 'days') ;

            await db.query(`INSERT INTO rents (id_car, id_user, start_date, end_date, is_compleate, total_price) 
            VALUES(${parseInt(id_car)}, ${id_user}, '${start_date}', '${end_date}', ${is_compleate}, ${days * originalPrice.rows[0].price});`)
            
            response.sendStatus(200);
        }
        catch (err) {
            console.log(err);
            response.sendStatus(500);
        }

    }

    async getActiveRents(request, response){
        try {
            const rents = await db.query(`select users."name", users.surname, users.patronymic, users.snpassport, cars.title, rents.id as "id_rents", rents.start_date, rents.end_date 
            from rents join cars on rents.id_car = cars.id join users on rents.id_user = users.id 
            where rents.is_compleate = false`);

            rents.rows.forEach(item => {
                item.start_date = addDays(item.start_date, 1).toJSON();
                item.end_date = addDays(item.end_date, 1).toJSON();

                let a = moment(item.end_date.replace('T', ' ').replace('Z','').split(' ')[0], "YYYY-MM-DD");
                let b = moment(new Date().toJSON().replace('T', ' ').replace('Z','').split(' ')[0], "YYYY-MM-DD");
                let days = b.diff(a, 'days');
        
                item.isOverdue = days > 0 ? true : false;
            })

            response.json({status: 200, value: rents.rows});
        } 
        catch (error) {
            response.sendStatus(500);
            console.log(error);
        }
    }
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

module.exports = new RentController();