const db = require('../db');

class LoginController {

    //POST запрос.
    async getLogin(request, response) {

        try {
            const { login, password } = request.body;

            const account = await db.query(`
            select users.id, users."name", users.surname, users.patronymic, users.age, users.snpassport, users.phone, users.photo, users.email, users.id_login, users.id_role, logins.login, logins."password", roles.title 
            from logins join users on logins.id = users.id_login join roles on users.id_role = roles.id 
            where login = '${login}' and "password" = '${password}'
            `);

            if (account.rows[0] == undefined) {
                response.sendStatus(404);
                return;
            }
            

            const blackListItem = await db.query(`select * from black_list where id_user=${account.rows[0].id}`)

            if (blackListItem.rows.length > 0) {
                response.status(404);
                response.json('Blocked');
                return;
            }
            else {
                const history = await db.query(`select rents.id, title, start_date, end_date, total_price from rents join cars on rents.id_car = cars.id where id_user=${account.rows[0].id}`);
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