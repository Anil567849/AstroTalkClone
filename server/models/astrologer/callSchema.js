import mongoose from 'mongoose';
import TokenServices from '../../services/tokenServices.js';

const callSchema = new mongoose.Schema({
    astroId : {
        type : mongoose.Schema.Types.ObjectId,
        require : true
    },
    orderId : {
        type : String,
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

const Call = mongoose.model("call_datas", callSchema);

export default Call;





