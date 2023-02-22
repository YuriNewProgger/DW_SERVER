const authModel = require('../Models/Auth.model');

class RegistController {

    async registration(request, response) {
        try {
            response.send(await authModel.Registration(request.body));
        } 
        catch (error) {
            console.log(error);
            response.sendStatus(500);
        }
        

    }
}

module.exports = new RegistController();