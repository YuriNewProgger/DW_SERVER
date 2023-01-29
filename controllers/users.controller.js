const db = require('../db');


class UsersController{

    async getAllUsers(request, response){

        const usersFromBD = await db.query(`select users.id, users.name, users.surname, users.patronymic, users.age, 
        users.snpassport, users.phone, users.photo, users.email, logins.login, logins."password", logins.id as "id_login"
        from users join logins on users.id_login  = logins.id`);
        response.json({status: 'Success', values: usersFromBD.rows});
    }

    async updateUser(request, response){
        const { id, name, surname, patronymic, age, email, login, password, phone, photo, snpassport, id_login} = request.body;

        const _age = parseInt(age);

        try{
            await db.query(`UPDATE logins SET login='${login}', "password"='${password}' WHERE id=${id_login};`)
            
            await db.query(`UPDATE users SET "name"='${name}', surname='${surname}', patronymic='${patronymic}', 
            age='${_age}', snpassport='${snpassport}', phone='${phone}', photo='${photo}', 
            email='${email}'
            WHERE id=${id};`)
        }
        catch(err){
            console.log(err);
            response.sendStatus(500);
            return;
        }
        
        

        response.sendStatus(200);
    }
}

module.exports = new UsersController();