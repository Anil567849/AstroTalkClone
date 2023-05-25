import bcrypt from 'bcryptjs';


class HashServices{

    hashData(data, cb){
        bcrypt.hash(data, 10, (err, hash) => {
            if (err) {
                console.error(err);
                cb(err);
            }else{
                const expiresOtp = Date.now() + 1000*60*10; // 10 minutes from now
                cb(null, hash + '.' + expiresOtp.toString());
            }
        });
    }

}

export default new HashServices();