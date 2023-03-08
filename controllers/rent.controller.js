const rentModel = require('../Domain/Rent');

class RentController {

    async registrRent(request, response) {
        try {
            response.json(await rentModel.TakeOnRent(request.body));
        } 
        catch (error) {
            console.log(error);
            response.sendStatus(500);
        }
    }

    async getActiveRents(request, response){
        try {
            response.json(await rentModel.GetActiveRents());
        } 
        catch (error) {
            console.log(error);
            response.sendStatus(500);
        }
    }

    async finishRent(request, response){
        try {
            response.json(await rentModel.FinishRent(request.body));
        } 
        catch (error) {
            console.log(error);
            response.sendStatus(500);
        }
    }
}


module.exports = new RentController();