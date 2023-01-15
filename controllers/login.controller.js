const db = require('../db');

class LoginController {

    //POST запрос.
    async getLogin(request, response) {

        const { login, password } = request.body;

        const account = await db.query(`
        select users.id, users."name", users.surname, users.patronymic, users.age, users.snpassport, users.phone, users.photo, users.email, users.id_login, users.id_role, logins.login, logins."password", roles.title 
        from logins join users on logins.id = users.id_login join roles on users.id_role = roles.id 
        where login = '${login}' and "password" = '${password}'
        `);

        const blackListItem = await db.query(`select * from black_list where id_user=${account.rows[0].id}`)

        if(blackListItem.rows.length > 0){
            response.status(404);
            response.json('Blocked');
            return;
        }

        if (account.rows[0] == undefined) {
            response.status(404);
            response.json('Bad');
        }
        else
            response.json(account.rows[0]);
    }
}

module.exports = new LoginController();