const db = require(`../db`);


class UserModel{

    async GetUsers(){

        const usersFromBD = await db.query(`select users.id, users.name, users.surname, users.patronymic, users.age, 
        users.snpassport, users.phone, users.photo, users.email, logins.login, logins."password", users.id_role as "id_role", logins.id as "id_login"
        from users join logins on users.id_login  = logins.id`);
        return {status: 'Success', values: usersFromBD.rows};
    }

    async Update(userParams){
        const { id, name, surname, patronymic, age, email, login, password, phone, photo, snpassport, id_login} = userParams;

        await db.query(`UPDATE logins SET login='${login}', "password"='${password}' WHERE id=${id_login};`);
            
        await db.query(`UPDATE users SET "name"='${name}', surname='${surname}', patronymic='${patronymic}', 
            age='${parseInt(age)}', snpassport='${snpassport}', phone='${phone}', photo='${photo}', 
            email='${email}'
            WHERE id=${id};`);
    }

    async Delete(userParams) {
        const { id, id_role, id_login} = userParams;
        if(parseInt(id_role) === 2){
            await db.query(`DELETE FROM users WHERE id=${id}`);
            await db.query(`DELETE FROM logins WHERE id=${id_login}`);
        }
    }
}

module.exports = new UserModel();