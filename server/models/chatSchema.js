import mongoose from 'mongoose';


const chatSchema = new mongoose.Schema({
    id1 : {
        type : mongoose.Schema.Types.ObjectId,
        require : true        
    },
    id2 : {
        type : mongoose.Schema.Types.ObjectId,
        require : true        
    },
    message : [
        {
            senderId: {
                type : mongoose.Schema.Types.ObjectId,
                require : true 
            },
            receiverId : {
                type : mongoose.Schema.Types.ObjectId,
                require : true        
            },
            msg : {
                type : String,
                require : true
            },
            date : {
                type : Date,
                default : Date.now
            }
        }
    ]
});


const Chat = mongoose.model("chats", chatSchema);

export default Chat;





