import React, {useEffect} from 'react'
import OptionCards from '../components/OptionCards.jsx';
import Axios from '../https/index.js';
import {useNavigate} from 'react-router-dom';





  

function Home() {
  const navigate = useNavigate();
  async function checkAuth(){    
    try {
        
      const isAuth = await Axios.home();
      console.log(isAuth);
    } catch (error) {
        console.log("You are not authenticated");
        navigate('/login');
    }
  }

  useEffect(() => {
    checkAuth();
  }, [])


  return (
    <div style={styles.box}>
        <OptionCards text="Chat with Astrologer" slug="chat-with-astrologer"/>
        <OptionCards text="Talk to Astrologer" slug="talk-to-astrologer"/>
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