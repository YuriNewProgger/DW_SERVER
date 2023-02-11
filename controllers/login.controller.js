const db = require('../db');
const crypto = require('crypto');

class LoginController {

    //POST запрос.
    async getLogin(request, response) {

        try {
            const { login, password } = request.body;
            const hash = crypto.createHash('sha256').update(password).digest('hex');

            const account = await db.query(`
            select users.id, users."name", users.surname, users.patronymic, users.age, users.snpassport, users.phone, users.photo, users.email, users.id_login, users.id_role, logins.login, logins."password", roles.title 
            from logins join users on logins.id = users.id_login join roles on users.id_role = roles.id 
            where login = '${login}' and "password" = '${hash}'
            `);

            if (account.rows[0] == undefined) {
                response.sendStatus(404);
                return;
            }
            

            const blackListItem = await db.query(`select * from black_list where id_user=${account.rows[0].id}`)

            if (blackListItem.rows.length > 0) {
                response.sendStatus(400);
                return;
            }
            else {
                const history = await db.query(`select rents.id, title, start_date, end_date, total_price, is_compleate from rents join cars on rents.id_car = cars.id where id_user=${account.rows[0].id}`);
                response.json({ status: 200, value: account.rows[0], history: history.rows });
            }

        }
        catch (error) {
            console.log(error);
            response.status(404);
            response.json('Bad');
        }


    }
}

module.exports = new LoginController();