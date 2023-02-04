const db = require('../db');

class BlackList{

    async getBlackList(request, response){

        
        try {
            const list = await db.query(`select users.name, users.surname , users.snpassport , users.id as "user_id", black_list.id as "blacklist_id", black_list.reason 
            from users join black_list on users.id = black_list.id_user `);

            response.json({status: 200, values: list.rows});
        } 
        catch (error) {
            console.log(error);
            response.json({status: 500, values: []});
        }
    }
}

module.exports = new BlackList();