import React, { useState, useEffect, useRef } from 'react';
import Input from '../components/chat/Input.jsx';
import SenderBox from '../components/chat/Sender.jsx';
import ReceiverBox from '../components/chat/Receiver.jsx';
import Styles from '../App.module.css';
import Styles1 from '../components/chat/chat.css';
import Axios from '../https/index.js';
import {useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {socket} from '../utils/io.js';

const css = {
  chatDisplay: {
    overflowY: 'scroll',
    maxHeight: '70vh',
    width: '100%',
  },
  chatArea: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    border: '5px solid blue',
    height: '86vh',
    padding: '10px',
  },
};

const Chat = () => {
  const [text, setText] = useState('');
  const [details, setDetails] = useState({
    senderId: '',
    receiverId: '',
  });
  const [chat, setChat] = useState([]);
  const chatDisplayRef = useRef(null);
  const navigate = useNavigate();
  const { receiverId } = useParams();

  async function checkAuth(){    
    try {
        
      const {data} = await Axios.home();
      if(data){
        setDetails({
          senderId : data.userId,
          receiverId,
        })
        
        fetchAllChats(data.userId);
      }
    } catch (error) {
        console.log("You are not authenticated");
        navigate('/login');
    }
  }

  async function fetchAllChats(senderId){    
    try {

      const {data} = await Axios.fetchAllChats({senderId, receiverId});
      // console.log(data);   
      if(data){
        setChat(data.chats.message);
      }

    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    checkAuth();
    // Scroll to the bottom of the chatDisplay div when the component updates
    chatDisplayRef.current.scrollTo(0, chatDisplayRef.current.scrollHeight);
  }, []);

  socket.on('newKafkaMsgReceived', (msg) => {
    // console.log('senderId', details.senderId);
    // console.log('type', typeof parsedResult.receiverId);
    // console.log('type', typeof parsedResult.senderId);

    const parsedResult = JSON.parse(msg);
    if(((parsedResult.receiverId == receiverId) && (parsedResult.senderId == details.senderId)) || (parsedResult.senderId == receiverId) && (parsedResult.receiverId == details.senderId)){
      setChat((old) => {
        return [...old, parsedResult];
      })
      console.log('chla');
    }
  })

  

  const handleSendClick = async (data, value) => {
    // console.log(value);
    setText('');
    if(value !== ""){
      try {

        await Axios.addChat({senderId : data.senderId, receiverId : data.receiverId, msg: value});        
          
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={Styles.containerFull}>
      <div style={css.chatArea}>
        <div className="chatDisplay" style={css.chatDisplay} ref={chatDisplayRef}>
        {
          chat && chat.map((items, index) => {
            return (items.senderId === details.senderId) ? <SenderBox key={items._id} text={items.msg} /> : <ReceiverBox key={items._id} text={items.msg} />
          })
        }
          
          
        </div>
        <Input type="text" placeholder="Type Something..." value={text} handleChat={(e) => setText(e.target.value)}  data={details} handleSendClick={handleSendClick}/>
      </div>
    </div>
  );
};

export default Chat;
