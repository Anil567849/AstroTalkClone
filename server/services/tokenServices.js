import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

class TokenServices{

    generateToken(id){
        let token = jwt.sign({ userId: id }, process.env.JWT_SECRET_TOKEN);
        return token;
    }

    verifyToken(tkn){
        return jwt.verify(tkn, process.env.JWT_SECRET_TOKEN);
    }

}

export default new TokenServices();