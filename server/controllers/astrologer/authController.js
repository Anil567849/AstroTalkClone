import OtpServices from '../../services/otpServices.js';
import TokenServices from '../../services/tokenServices.js';
import User from '../../models/astrologer/userSchema.js';

class AuthController{

    async sendOTP(req, res){
        const {name, phone} = req.body;
        // console.log(phone);

        // const otp = OtpServices.generateOTP();
        const otp = 55555;
        console.log('otp', otp);

        // ToDo: You can send this otp to user phone using twilio services



        const hashedOTP = OtpServices.hashOTP(otp.toString(), (err, hashedOTP) => {
            if(!err){
                res.status(200).json({hashedOTP})
            }else{
                console.log(err);
            }
        });      

    }
    
    async verifyOTP(req, res){

        // console.log('verified called');

        const {phone, otp, hashedOtp} = req.body;
        const expires= hashedOtp.substr(hashedOtp.lastIndexOf('.')+1); 
        if(Date.now() > +expires){
            return res.status(200).json({verified : false, data: 'otp expired'});
        }
        
        const verified = OtpServices.verifyOTP(otp, hashedOtp);

        if (verified) {

            try {

                const userAlreadyExist = await User.findOne({phone});

                if(userAlreadyExist){

                    const token = TokenServices.generateToken(userAlreadyExist._id.toString());

                    try {
                        await userAlreadyExist.updateOne({token});
                        // const ThirtyMinutes = 1000 * 60 * 30;
                        const ThirtyMinutes = 1000 * 60 * 300000;
                        res.cookie('jwtToken', token, { maxAge: ThirtyMinutes});
                        return res.status(200).json({ verified: true, token });
                    } catch (error) {
                        console.log(error);
                    }
                }else{
                    const user = new User({
                        name : "Anil",
                        phone
                    });
                
                    const token = TokenServices.generateToken(user._id.toString());
                
                    user.token = token;
                
                    const savedUser = await user.save();
                    if (savedUser) {
                        // const ThirtyMinutes = 1000 * 60 * 30;
                        const ThirtyMinutes = 1000 * 60 * 300000;
                        res.cookie('jwtToken', token, { maxAge: ThirtyMinutes});
                        return res.status(200).json({ verified: true, userId : user._id.toString() });
                    } else {
                        return res.status(401).json({ verified: false, data: "user not saved" });
                    }
                }
                
            } catch (error) {
                res.status(400).json({error});
            }
          }
        return res.status(200).json({verified, data: null});

    }
}


export default new AuthController();