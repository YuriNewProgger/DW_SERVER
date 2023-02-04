const db = require('../db');

class BlackList {

    async getBlackList(request, response) {


        try {
            const list = await db.query(`select users.name, users.surname , users.snpassport , users.id as "user_id", black_list.id as "blacklist_id", black_list.reason 
            from users join black_list on users.id = black_list.id_user `);

            response.json({ status: 200, values: list.rows });
        }
        catch (error) {
            console.log(error);
            response.json({ status: 500, values: [] });
        }
    }

    async addUserToBlackList(request, response) {
        try {
            const { snpassport, reason } = request.body;

            const user = await db.query(`select id from users where snpassport = '${snpassport}'`);

            if (user.rows.length === 0) {
                response.json({ status: 404, values: [] })
                return;
            }

            await db.query(`INSERT INTO black_list (id_user, reason) VALUES(${user.rows[0].id}, '${reason}');`);

            const list = await db.query(`select users.name, users.surname , users.snpassport , users.id as "user_id", black_list.id as "blacklist_id", black_list.reason 
            from users join black_list on users.id = black_list.id_user `);

            response.json({ status: 200, values: list.rows });

        }
        catch (error) {
            response.sendStatus(500);
            console.log(error);
        }

    }

    async deleteFromBlackList(request, response){
        try {
            //await db.query()
        } 
        catch (error) {
            
        }
    }
}

module.exports = new BlackList();