import twilio from 'twilio';
import Call from '../../models/astrologer/callSchema.js';
import CallRequest from '../../models/astrologer/callRequestSchema.js';
import Chat from '../../models/chatSchema.js';
import {sendMessage, consumeMessages} from '../../kafka/kafka.js';

class RouteController{

    home(req, res){
        // console.log('hello astro home');
        res.status(200).json({userId : req.userId, phone : req.phone, token : req.token});
    }

    callToUser(req, res){
        const {astroId, userId, userPhone} = req.body;
        const accountSid = process.env.ACCOUNT_SID;
        const authToken = process.env.AUTH_TOKEN;
        
        const client = twilio(accountSid, authToken);

        // Function to download the recording
        function downloadRecording(url, filename) {
            const file = fs.createWriteStream(filename);
            https.get(url, response => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log('Recording downloaded successfully');
            });
        });
        }

        // Function to fetch the recording
        function fetchRecording(callSid) {
            client.recordings
            .list({ callSid: callSid, limit: 1 })
            .then(recordings => {
                if (recordings.length > 0) {
                const recording = recordings[0];
                console.log('Recording SID:', recording.sid);
                console.log('Recording URL:', recording.uri);
                // download or process the recording here
                downloadRecording(recording.uri, recording.sid + '.mp3');
                } else {
                    console.log('No recordings found for the call');
                }
            })
            .catch(error => console.error('Error fetching recording:', error));
        }

        function makeCall() {
            client.calls
                .create({
                    url: 'http://demo.twilio.com/docs/voice.xml',
                    from: '+12543182140', // Your Twilio phone number
                    to: `+91 ${userPhone}` // The recipient's phone number 
                })
                .then(call => {
                    console.log('Call SID:', call.sid)
                    // fetchRecording(call.sid);
                    res.status(200).json({success : true, callSid : call.sid});
                })
                .catch(error => {
                    console.error('Error making call:', error);
                    res.status(400).json({error});
                });            
        }

        // makeCall();
        res.status(200).json({success : true, callSid : "call.sid"}); // remove this line when you makeCall() actually

    }

    async saveCallData(req, res){

        const {astroId, orderId, userPhone} = req.body;
        
        const call = new Call({
            astroId,
            orderId,
            userPhone,
        });

        try {
            const saved = await call.save();
            res.status(200).json({success : true});
        } catch (error) {
            console.log(error);
            res.status(400).json({error});
        }
    }

    async addCallRequest(req, res){

        const {astroId, userId, userPhone} = req.body;

        try {

            const exist = await CallRequest.findOne({astroId, userId});
            console.log(exist);
            if(!exist){
            
                const callRequest = new CallRequest({
                    astroId,
                    userId,
                    userPhone,
                });

                try {
                    const saved = await callRequest.save();                    
                } catch (error) {
                    console.log(error);
                    res.status(400).json({error});
                }

            }
            res.status(200).json({success : true});
        } catch (error) {
            res.status(400).json({error});            
        }
        
    }

    async deleteCallRequest(req, res){

        const {astroId, userId, userPhone} = req.body;

        try {
            const deleted = await CallRequest.deleteOne({astroId, userId});
            res.status(200).json({success : true});            
        } catch (error) {
            res.status(400).json({error});            
        }
        
    }

    async getCallRequests(req, res){

        const {astroId} = req.body;
        try {
            const requests = await CallRequest.find({astroId});
            res.status(200).json({requests});        
        } catch (error) {
            res.status(400).json({error});            
        }
    }

    async fetchAllChatUser(req, res){

        const {astroId} = req.body;
        try {
            const chatUser = await Chat.find({$or : [{id1: astroId}, {id2: astroId}]});
            res.status(200).json({chatUser});
        } catch (error) {
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
            console.log(error);
            res.status(400).json({error});
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
}


export default new RouteController();