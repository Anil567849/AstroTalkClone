
import AstrologerUser from '../models/astrologer/userSchema.js';
import Chat from '../models/chatSchema.js';
import {sendMessage, consumeMessages} from '../kafka/kafka.js';

class RouteController{
    home(req, res){
        console.log('hello user home');
        res.status(200).json({userId : req.userId, phone : req.phone, token : req.token});
    }


    async fetchAllAstrologer(req, res){
        try {
            // console.log('fetch astro');
            const allAstro = await AstrologerUser.find();
            // console.log(allAstro);
            res.status(200).json({allAstro})                
        } catch (error) {
            res.status(400).json(error);
        }
    }


    async addChat(req, res){
        const {senderId, receiverId, msg} = req.body;
        // console.log(senderId, receiverId, msg);


        try {

            const exist = await Chat.findOne({$or: [{id1: senderId, id2: receiverId}, {id1: receiverId, id2: senderId}]});
            // console.log('exist',exist);
            
            if(exist){
                //push your msg
                const filter = {
                    $or: [
                      { id1: senderId, id2: receiverId },
                      { id1: receiverId, id2: senderId }
                    ]
                  };
                  
                  const update = {
                    $push: {
                      message: {
                        senderId,
                        receiverId,
                        msg,
                      }
                    }
                  };
                  
                    try {
                        const updated = await Chat.updateOne(filter, update);
                        if(updated){
                            sendMessage('astro-user-chat', {senderId, receiverId, msg});
                            res.status(200).json({chatSaved: true});
                        }
                        
                    } catch (error) {
                        res.status(400).json({error});
                    }
            }else{
                try {
                
                    const message = {
                        senderId,
                        receiverId,
                        msg,
                    }

                    const chat = new Chat({
                        id1 : senderId,
                        id2 : receiverId,
                        message
                    });
                    const saved = await chat.save();
                    if(saved){
                        sendMessage('astro-user-chat', {senderId, receiverId, msg});
                        res.status(200).json({chatSaved: true});
                    }else{
                        res.status(400).json({chatSaved: false});
                    }
                } catch (error) {
                    res.status(400).json({error});
                }
            }     
            
        } catch (error) {
            console.log(error);
            res.status(400).json({error});
        }
         

    }

    async fetchAllChats(req, res){
        const {senderId, receiverId} = req.body;
        // console.log('me', senderId, receiverId);
        try {
            const chats = await Chat.findOne({$or : [{id1: senderId, id2: receiverId}, {id1: receiverId, id2: senderId}]});
            consumeMessages('astro-user-chat');
            res.status(200).json({chats});
        } catch (error) {
            res.status(400).json({error});
        }
    }
}


export default new RouteController();