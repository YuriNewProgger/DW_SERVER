const db = require('../db');

class LoginController{

    //POST запрос.
    async getLogin(request, response){

        const {login, password} = request.body;

        const account = await db.query(`select * 
        from logins join users on logins.id = users.id_login join roles on users.id_role = roles.id 
        where login = '${login}' and "password" = '${password}'`);

        if(account.rows[0] == undefined){
            response.status(404);
            response.json('Bad');
        }
        else
            response.json(account.rows[0]);
    }
}

module.exports = new LoginController();