const blackListModel = require('../Domain/BlackList');

class BlackList {

    async getBlackList(request, response) {
        try {
            response.json(await blackListModel.GetAllUsers());
        } 
        catch (error) {
            console.log('getBlackList ERROR', error);
            response.json({ status: 500, values: [] });
        }
    }

    async addUserToBlackList(request, response) {
        try {
            let list = await blackListModel.AddUser(request.body);
            response.json({ status: 200, values: list });
        } 
        catch (error) {
            console.log(error);
            response.sendStatus(500);
        }

    }

    async deleteFromBlackList(request, response){
        try {
            let list = await blackListModel.RemoveUser(request.body);
            response.json({ status: 200, values: list });
        } 
        catch (error) {
            console.log(error);
            response.sendStatus(500);
        }
    }
}

module.exports = new BlackList();