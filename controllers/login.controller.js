const authModel = require('../Models/Auth.model');
const authServise = require('../Services/AuthService');

class LoginController {

    //POST запрос.
    async getLogin(request, response) {
        try {
            let login = await authModel.GetLogin(request.body);
            login.token = await authServise.GenerateToken(login.value.id);

            response.json(login);
        } 
        catch (error) {
            console.log(error);
            response.sendStatus(500);
        }


    }
}

module.exports = new LoginController();