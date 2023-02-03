const db = require('../db');
const crypto = require('crypto');

class RegistController {

    //POST запрос.
    async registration(request, response) {
        try {
            const { name, surname, patronymic, snpassport, age, phone, email, login, password } = request.body;

        const hash = crypto.createHash('sha256').update(password).digest('hex');

        const _login = await db.query(`SELECT * FROM logins WHERE login='${login}' and password='${hash}'`);
            if(_login.rows.length > 0){
                response.status(400);
                response.send("Exist login");
                return;
            }
            const user = await db.query(`SELECT * FROM users WHERE snpassport='${snpassport}'`);
            if(user.rows.length > 0){
                response.status(400);
                response.send("Exist user");
                return;
            }


            await db.query(`
                    do $$
                        declare idLogin INTEGER;
                        begin
                        INSERT INTO logins (login, "password") VALUES('${login}', '${hash}');
                        select (select id from logins where login = '${login}') into idLogin;

                        INSERT INTO users ("name", surname, patronymic, age, snpassport, phone, photo, email, id_login, id_role)
                            VALUES('${name}', '${surname}', '${patronymic}', '${age}', '${snpassport}', '${phone}', 'NULL', '${email}', idLogin, 2);

                        end
                    $$;
            `);

            response.status(200);
            response.send("Success");
        } 
        catch (error) {
            console.log(error);
            response.status(400);
            response.send("Bad");
        }
        

    }
}

module.exports = new RegistController();