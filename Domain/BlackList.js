const db = require('../db');


class BlackList{

    async GetAllUsers() {

        const list = await db.query(`select users.name, users.surname , users.snpassport , users.id as "user_id", black_list.id as "blacklist_id", black_list.reason 
        from users join black_list on users.id = black_list.id_user `);

        return { status: 200, values: list.rows }
    }

    async AddUser(blackListParams) {
        const { snpassport, reason } = blackListParams;

        const user = await db.query(`select id from users where snpassport = '${snpassport}'`);

        await db.query(`INSERT INTO black_list (id_user, reason) VALUES(${user.rows[0].id}, '${reason}');`);

        const list = await db.query(`select users.name, users.surname , users.snpassport , users.id as "user_id", black_list.id as "blacklist_id", black_list.reason 
        from users join black_list on users.id = black_list.id_user `);

        return list.rows;

    }

    async RemoveUser(blackListParams){
        const { snpassport } = blackListParams;

        const user = await db.query(`select id from users where snpassport = '${snpassport}'`);
        await db.query(`delete from black_list where id_user = '${user.rows[0].id}'`)

        const list = await db.query(`select users.name, users.surname , users.snpassport , users.id as "user_id", black_list.id as "blacklist_id", black_list.reason 
        from users join black_list on users.id = black_list.id_user `);

        return list.rows;
    }
}


module.exports = new BlackList();