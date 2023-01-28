const db = require('../db');


class UsersController{

    async getAllUsers(request, response){

        const usersFromBD = await db.query(`select users.id, users.name, users.surname, users.patronymic, users.age, users.snpassport, users.phone, users.photo, users.email, logins.login, logins."password" 
        from users join logins on users.id_login  = logins.id`);
        //response.json(usersFromBD.rows);
        response.json({status: 'Success', values: usersFromBD.rows});
    }
}

module.exports = new UsersController();