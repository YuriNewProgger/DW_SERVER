const authModel = require('../Models/Auth.model');

class LoginController {

    //POST запрос.
    async getLogin(request, response) {
        try {
            response.json(await authModel.GetLogin(request.body));
        } 
        catch (error) {
            console.log(error);
            response.sendStatus(500);
        }


    }
}

module.exports = new LoginController();