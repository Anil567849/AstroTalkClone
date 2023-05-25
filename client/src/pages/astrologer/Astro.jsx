import React, {useEffect, useState} from 'react'
import OptionCards from '../../components/OptionCards.jsx';
import CallReceive from '../../components/CallReceive.jsx';
import {AstroAxios} from '../../https/index.js';
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import {setUserData} from '../../store/authSlice.js';
import { useDispatch } from 'react-redux';
import {io, socket} from '../../utils/io.js';

function Home() {

  const navigate = useNavigate();
  const dispatch = useDispatch('');
  const [details, setDetails] = useState("");
  const {userId: astroId, phone} = useSelector(state => state.auth);
  
  async function checkAuth(){    
    console.log('check auth');
    try {        
      const {data} = await AstroAxios.home();
      // console.log(data);
      if(data){
        dispatch(setUserData({userId : data.userId, phone : data.phone}));
      }

    } catch (error) {
        console.log("You are not authenticated");
        navigate('/astrologer/login');
    }
  }

  useEffect(() => {
    checkAuth();
  }, [])
  
  return (
    <div>
      <h2 style={{textAlign: 'center', border: '2px solid red'}}>Astro Home</h2>
      <div style={styles.box}>
        <OptionCards text="Chat Logs" slug="astrologer/chat-logs"/>
        <OptionCards text="Talk Logs" slug="astrologer/call-logs"/>
      </div>
    </div>
  )
}


const styles = {
  box: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '2rem'
  }
}


export default Home