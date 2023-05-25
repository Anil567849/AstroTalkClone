import React, {useEffect, useState} from 'react'
import AstroCard from '../components/AstroCard';
import DialingModal from '../components/DialingModal';
import Axios from '../https/index.js';
import {useNavigate} from 'react-router-dom';
import {io, socket} from '../utils/io.js';




function TalkToAstrologer() {

  const [allAstro, setAllAstro] = useState([]);
  const [myData, setSetMyData] = useState([]);
  const navigate = useNavigate();


  const fetchAllAstrologer = async () => {
    try {
      const {data} = await Axios.fetchAllAstrologer();
      setAllAstro(data.allAstro);      
    } catch (error) { 
        console.log(error);
        navigate('/login');
    }
  }

  async function checkAuth(){    
    try {
        
      const {data} = await Axios.home();
      setSetMyData(data);

    } catch (error) {
        console.log("You are not authenticated", error);
        navigate('/login');
    }
  }
  
  useEffect(() => {
    checkAuth();
    fetchAllAstrologer();
  }, [])

  const chatToAstrologer = (astroData) => {
    // console.log(astroData);
    navigate(`/chat/${astroData._id}`);
  }



  return (
    <>
      <h1 style={styles.h1Heading}>Let's Chat with your favourite Astrologer</h1>

      <div style={styles.fullContainer, styles.flex}>
        {
          allAstro.map((item, index) => {
            return <AstroCard key={item._id} id={item._id} action={() => chatToAstrologer(item)} name={item._id} buttonName="Chat"/>
          })
        }
      </div>
    </>
  )
}



const styles = {
  h1Heading: {
    textAlign: 'center'
  },
  flex: {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto',
  },
  fullContainer: {
    padding: '0 1rem',
    maxWidth: '100vw',
  }
}


export default TalkToAstrologer