import React, {useEffect, useState} from 'react'
import OptionCards from '../../components/OptionCards.jsx';
import AstroCard from '../../components/AstroCard.jsx';
import CallReceive from '../../components/CallReceive.jsx';
import {AstroAxios} from '../../https/index.js';
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import {setUserData} from '../../store/authSlice.js';
import { useDispatch } from 'react-redux';
import {io, socket} from '../../utils/io.js';

function ChatLogs() {

  const navigate = useNavigate();
  const dispatch = useDispatch('');
  const [details, setDetails] = useState("");
  const [head, setHead] = useState(null);
  const [chatUser, setChatUser] = useState([])
  const {userId: astroId, phone} = useSelector(state => state.auth);  


  async function fetchAllChatUser(astroId){
    try {
        const {data} = await AstroAxios.fetchAllChatUser({astroId});
        // console.log('me', data.chatUser);
        if(data){
            setChatUser(data.chatUser);
        }
    } catch (error) {
        console.log(error);
    }
  }


  async function checkAuth(){    
    console.log('check auth');
    try {        
      const {data} = await AstroAxios.home();
      // console.log(data);
      if(data){
        dispatch(setUserData({userId : data.userId, phone : data.phone}));
        fetchAllChatUser(data.userId);
      }

    } catch (error) {
        console.log("You are not authenticated");
        navigate('/astrologer/login');
    }
  }

  const socketConnection = () => {

    socket.on('connect', () => {
      console.log('Connected to the server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });

    // Rest of your event handlers

    return () => {
      socket.disconnect(); // Disconnect when the component unmounts
    };
  }
  useEffect(() => {
    checkAuth();
    socketConnection();
  }, [])
  
  function chatToUser(item, recId){
    // console.log(item);
    navigate(`/astrologer/chat-logs/${recId}`)
  }

  return (
    <div>
      <h2 style={{textAlign: 'center', border: '2px solid red'}}>Chat Logs</h2>
      {
        chatUser.map((item, index) => {
              {/* console.log('item', item); */}
              return item.id1 === astroId ? (<AstroCard key={index} id={item._id} action={() => chatToUser(item, item.id1)} name={item.id2} buttonName="Chat"/>) : (<AstroCard key={index} id={item._id} action={() => chatToUser(item, item.id1)} name={item.id1} buttonName="Chat"/>)
          })
      }
    </div>
  )
}

export default ChatLogs