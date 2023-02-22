const db = require('../db');
const moment = require('moment');


class RentModel{

    async TakeOnRent(rentParams) {
        const { id_car, id_user, start_date, end_date, is_compleate, total_price } = rentParams;

        const _isCompleated = await db.query(`select is_compleate from rents where id_user = ${id_user} order by end_date desc `);
        

        if(_isCompleated.rows.find(item => item.is_compleate === false) > 0){
            return { status: 404, history: [] };
        }

        const originalPrice = await db.query(`select price  from cars where id = ${id_car}`);
        let firstDate = moment(start_date, "YYYY-MM-DD");
        let secondDate = moment(end_date, "YYYY-MM-DD");
        let days = secondDate.diff(firstDate, 'days') ;
        await db.query(`INSERT INTO rents (id_car, id_user, start_date, end_date, is_compleate, total_price) 
        VALUES(${parseInt(id_car)}, ${id_user}, '${start_date}', '${end_date}', ${is_compleate}, ${days * originalPrice.rows[0].price});`)
        
        const history = await db.query(`select rents.id, title, start_date, end_date, total_price, is_compleate from rents join cars on rents.id_car = cars.id where id_user=${id_user}`);

        return { status: 200, history: history.rows };
    }

    async GetActiveRents(){
        let rents = await db.query(`select users."name", users.surname, users.patronymic, users.snpassport, cars.title, rents.id as "id_rents", rents.start_date, rents.end_date 
            from rents join cars on rents.id_car = cars.id join users on rents.id_user = users.id 
            where rents.is_compleate = false`);

        this.CheckOverdue(rents);
        return {status: 200, value: rents.rows};
    }

    async FinishRent(rentParams){
        const {id_rent} = rentParams;

        await db.query(`UPDATE rents SET is_compleate=true WHERE id=${id_rent};`)

        const rents = await db.query(`select users."name", users.surname, users.patronymic, users.snpassport, cars.title, rents.id as "id_rents", rents.start_date, rents.end_date 
        from rents join cars on rents.id_car = cars.id join users on rents.id_user = users.id 
        where rents.is_compleate = false`);

        this.CheckOverdue(rents);

        return {status: 200, value: rents.rows};
    }


    AddDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
    
    CheckOverdue(list){
        list.rows.forEach(item => {
            item.start_date = this.AddDays(item.start_date, 1).toJSON();
            item.end_date = this.AddDays(item.end_date, 1).toJSON();
    
            let a = moment(item.end_date.replace('T', ' ').replace('Z','').split(' ')[0], "YYYY-MM-DD");
            let b = moment(new Date().toJSON().replace('T', ' ').replace('Z','').split(' ')[0], "YYYY-MM-DD");
            let days = b.diff(a, 'days');
    
            item.isOverdue = days > 0 ? true : false;
        })
    }
}

module.exports = new RentModel();