import mongoose from 'mongoose';
import TokenServices from '../services/tokenServices.js';
const userSchema = new mongoose.Schema({
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


const User = mongoose.model("users", userSchema);

export default User;





