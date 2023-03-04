const db = require(`../db`);
const authService = require('../Services/AuthService');

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

        let activeRents = await db.query(`select is_compleate  from rents where id_user = ${id}`)

        let respStatus = 200;

        activeRents.rows.forEach(item => {
            if(item.is_compleate === false)
                respStatus = 406;
        })

        if(respStatus === 406)
            return respStatus;

        await db.query(`DELETE FROM rents WHERE id_user=${id}`);
        await db.query(`DELETE FROM users WHERE id=${id}`);
        await db.query(`DELETE FROM logins WHERE id=${id_login}`);
        respStatus = 200;

        return respStatus;
    }

    async GetAuthUser(headers){
        const userId = await authService.GetPayload(headers);

        const account = await db.query(`
        select users.id, users."name", users.surname, users.patronymic, users.age, users.snpassport, users.phone, users.photo, users.email, users.id_login, users.id_role, logins.login, logins."password", roles.title 
        from logins join users on logins.id = users.id_login join roles on users.id_role = roles.id 
        where users.id = '${userId.id}'
        `);
        
        return { status: 200, value: account.rows[0] };
    }

    async GetAllRents(userParams){
        const { id } = userParams;
        
        const allRents = await db.query(`select rents.id, title, start_date, end_date, total_price, is_compleate from rents join cars on rents.id_car = cars.id where id_user=${parseInt(id)}`);

        return { status: 200, values: allRents.rows };
    }
}

module.exports = new UserModel();