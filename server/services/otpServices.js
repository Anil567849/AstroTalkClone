import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import HashServices from './hashServices.js';


class OtpServices{

    generateOTP(){
        const otp = crypto.randomInt(100000, 999999);
        return otp;
    }

    hashOTP(otp, cb){
        HashServices.hashData(otp, (err, data) => {
        if(err){
                // console.log(err);
                return cb(err);
            }else{
                return cb(null, data);
            }
        });
    }

    verifyOTP(otp, hashed){
        const hash = hashed.substr(0, hashed.lastIndexOf('.'));
        return bcrypt.compareSync(otp, hash); // true
    }


}

export default new OtpServices();