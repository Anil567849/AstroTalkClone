import React, {useEffect, useState} from 'react'
import OptionCards from '../../components/OptionCards.jsx';
import CallReceive from '../../components/CallReceive.jsx';
import {AstroAxios} from '../../https/index.js';
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import {setUserData} from '../../store/authSlice.js';
import { useDispatch } from 'react-redux';
import {io, socket} from '../../utils/io.js';

function CallLogs() {

  const navigate = useNavigate();
  const dispatch = useDispatch('');
  const [details, setDetails] = useState("");
  const [head, setHead] = useState(null);
  const {userId: astroId, phone} = useSelector(state => state.auth);  

  const insertAtTail = (val) => {
    const newNode = { data: val, next: null };

    if (!head) {
      setHead(newNode);
      return;
    }

    let current = head;
    while (current.next) {
      current = current.next;
    }

    current.next = newNode;
    setHead({ ...head }); // Trigger re-render by updating head with a new reference
  };

  const deletion = (val) => {
    if (!head) {
      return;
    }

    if (head.data.userId === val) { // delete head
      console.log('delete head');
      setHead(head.next);
      return;
    }

    let prev = null;
    let current = head;

    while (current && current.data.userId !== val) {
      prev = current;
      current = current.next;
    }

    if (current) {
      console.log('delete other node');
      prev.next = current.next;
      setHead({ ...head }); // Trigger re-render by updating head with a new reference
    }
  };


  async function checkAuth(){    
    console.log('check auth');
    try {        
      const {data} = await AstroAxios.home();
      // console.log(data);
      if(data){
        dispatch(setUserData({userId : data.userId, phone : data.phone}));

        getCallRequests(data.userId);
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

  const getCallRequests = async (id) => {
    try {
      const {data} = await AstroAxios.getCallRequests({astroId : id});
      if(data.requests.length === 0){
        console.log('no calls yet');
      }else{
        for(let i = 0; i < data.requests.length; i++){
          insertAtTail(data.requests[i]);
        }
      }
    } catch (error) {
      console.log('No Request Found', error);
    }
  }

  useEffect(() => {
    checkAuth();
    socketConnection();
  }, [])
  

  socket.on('callingAstro', async (data) => {
    if(data.astroId === astroId){
      setDetails(data);
      insertAtTail(data);
      try {
        const inserted = await AstroAxios.addCallRequest(data);        
      } catch (error) {
        console.log(error);
      }
    }
  })

  socket.on('cancleCalling', async (data) => {
    if(data.astroId === astroId){
      deletion(data.userId)
      try {
        const del = await AstroAxios.deleteCallRequest(data);
      } catch (error) {
        console.log(error);
      }
    }
  })

  const handleAccept = async (response, userId) => {

    if(response === 'accept'){

      try {
        const {data} = await AstroAxios.callToUser(details);
        console.log('call ended successfully');
        try {
          const {data: savedData} = await AstroAxios.saveCallData({astroId, orderId : data.callSid, userPhone : details.userPhone}); // you can save recording_uri, call_duration etc.
          deletion(userId);
          try {
            const del = await AstroAxios.deleteCallRequest(details);
          } catch (error) {
            console.log(error);
          }       
        } catch (error) {
            console.log(error);
            deletion(userId);
        }
      } catch (error) {
          console.log(error);
          deletion(userId);
      }

    }else{
      console.log('call rejected');
      socket.emit('callRejected', userId);
      deletion(userId);
      try {
        const del = await AstroAxios.deleteCallRequest(details);
      } catch (error) {
        console.log(error);
      }
    }

  }

  return (
    <div>
      <h2 style={{textAlign: 'center', border: '2px solid red'}}>Call Logs</h2>
      <div>
          {head && (<CallReceive node={head} handleAccept={handleAccept}/>)}
      </div>
    </div>
  )
}

export default CallLogs