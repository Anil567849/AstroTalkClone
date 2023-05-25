import mongoose from 'mongoose';
import TokenServices from '../../services/tokenServices.js';

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    phone : {
        type : Number,
        require : true        
    },
    date : {
        type : Date,
        default : Date.now
    },
    token : {
        type : String,
    }

});


const User = mongoose.model("astrologer", userSchema);

export default User;





