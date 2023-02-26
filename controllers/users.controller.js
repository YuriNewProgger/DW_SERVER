const userModel = require(`../Models/User.model`);


class UsersController{

    async getAllUsers(request, response){
        try {
            response.json(await userModel.GetUsers());
        } 
        catch (error) {
            console.log(error);
            response.senStatus(500);
        }
    }

    async updateUser(request, response){
        try {
            await userModel.Update(request.body);
            response.sendStatus(200);
        } 
        catch (error) {
            console.log(error);
            response.sendStatus(500);
        }
    }

    async deleteUser(request, response) {
        try {
            await userModel.Delete(request.body);
            response.sendStatus(200);
        } 
        catch (error) {
            console.log(error);
            response.sendStatus(500);
        }
    }

    async getAuthUser(request, response) {
        try {
            response.json(await userModel.GetAuthUser(request.headers))
        } 
        catch (error) {
            console.log(error);
            response.sendStatus(500);
        }
    }

    async getAllRents(request, response){
        try {
            response.json(await userModel.GetAllRents(request.body))
        } 
        catch (error) {
            console.log(error);
            response.sendStatus(500);
        }
    }
}

module.exports = new UsersController();