const db = require('../db');
const crypto = require('crypto');

class AuthModel{

    async GetLogin(loginParams) {
        const { login, password } = loginParams;
        const hash = crypto.createHash('sha256').update(password).digest('hex');
        const account = await db.query(`
        select users.id, users."name", users.surname, users.patronymic, users.age, users.snpassport, users.phone, users.photo, users.email, users.id_login, users.id_role, logins.login, logins."password", roles.title 
        from logins join users on logins.id = users.id_login join roles on users.id_role = roles.id 
        where login = '${login}' and "password" = '${hash}'
        `);

        if (account.rows[0] == undefined) {
            return { status: 404, value: "", history: [] };
        }
        
        const blackListItem = await db.query(`select * from black_list where id_user=${account.rows[0].id}`)
        if (blackListItem.rows.length > 0) {
            return { status: 400, value: "", history: [] };
        }
        else {
            //const history = await db.query(`select rents.id, title, start_date, end_date, total_price, is_compleate from rents join cars on rents.id_car = cars.id where id_user=${account.rows[0].id}`);
            return { status: 200, value: account.rows[0] };
        }

    }

    async Registration(registrationParams) {
        const { name, surname, patronymic, snpassport, year, phone, photo, email, login, password } = registrationParams;


        if(new Date().getFullYear() - year < 18){
            return {status: 400, text: "Age no valid"};
        }

        const hash = crypto.createHash('sha256').update(password).digest('hex');

        const _login = await db.query(`SELECT * FROM logins WHERE login='${login}' and password='${hash}'`);
        if(_login.rows.length > 0){
            return {status: 400, text: "Exist login"};
        }
        
        const user = await db.query(`SELECT * FROM users WHERE snpassport='${snpassport}'`);
        if(user.rows.length > 0){
            return {status: 400, text: "Exist user"};
        }


        await db.query(`
                    do $$
                        declare idLogin INTEGER;
                        begin
                        INSERT INTO logins (login, "password") VALUES('${login}', '${hash}');
                        select (select id from logins where login = '${login}') into idLogin;

                        INSERT INTO users ("name", surname, patronymic, age, snpassport, phone, photo, email, id_login, id_role)
                            VALUES('${name}', '${surname}', '${patronymic}', '${new Date().getFullYear() - year}', '${snpassport}', '${phone}', '${photo}', '${email}', idLogin, 2);

                        end
                    $$;
            `);

        return {status: 200, text: "Success"};
        
    }
}

module.exports = new AuthModel();