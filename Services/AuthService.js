const jwt = require('jsonwebtoken');

class AuthService{
    #Key = 'R8LS-YyMu-b2fu-zjYc'

    get GetKey(){
        return this.#Key;
    }

    GenerateToken(userId){
        return jwt.sign({ 'id': userId }, this.#Key);
    }

    GetPayload(token){
        return jwt.verify(token.authorization.split(' ')[1], this.#Key);
    }
}

module.exports = new AuthService();