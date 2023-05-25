import mongoose from 'mongoose';
import TokenServices from '../../services/tokenServices.js';

const callRequestSchema = new mongoose.Schema({
    astroId : {
        type : mongoose.Schema.Types.ObjectId,
        require : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        require : true
    },
    userPhone : {
        type : Number,
        require : true        
    },
    date : {
        type : Date,
        default : Date.now
    }

});

const CallRequest = mongoose.model("call_request", callRequestSchema);

export default CallRequest;





