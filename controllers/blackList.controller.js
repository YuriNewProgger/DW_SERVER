const db = require('../db');

class BlackList{

    async getBlackList(request, response){

        
        try {
            const list = await db.query(`select * from users join black_list on users.id = black_list.id_user `);

            response.json(list.rows);
        } 
        catch (error) {
            console.log(error);
            response.sendStatus(500);
        }
    }
}

module.exports = new BlackList();