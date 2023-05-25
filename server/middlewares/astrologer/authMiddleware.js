import TokenServices from '../../services/tokenServices.js';
import User from '../../models/astrologer/userSchema.js';


class AuthMiddleware{

    
    async checkAuthentication(req, res, next){

        try{

            const tkn = req.cookies.jwtToken;
            
            const jwtVerifiedToken = TokenServices.verifyToken(tkn);
    
            const rootUser = await User.findOne({_id : jwtVerifiedToken.userId, "token" : tkn});
            // console.log(rootUser);
            if(!rootUser){
                throw new Error("user not found");
            }
    
            req.token = tkn;
            req.phone = rootUser.phone;
            req.userId = rootUser._id;
    
            next();
    
        }catch(err){
            res.status(401).json({err : "authenticate.js " + err});
        }

    }
}


export default new AuthMiddleware();