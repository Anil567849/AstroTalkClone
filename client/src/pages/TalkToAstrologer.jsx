import React, {useEffect, useState} from 'react'
import AstroCard from '../components/AstroCard';
import DialingModal from '../components/DialingModal';
import Axios from '../https/index.js';
import {useNavigate} from 'react-router-dom';
import {io, socket} from '../utils/io.js';




function TalkToAstrologer() {

  const [allAstro, setAllAstro] = useState([]);
  const [myData, setsetMyData] = useState([]);
  const [details, setDetails] = useState("");
  const [showDialing, setShowDialing] = useState(false)
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(true);
  console.log(open);
  const handleClose = () => {
    setOpen(false);
    socket.emit('cancleCalling', details);
  } 

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
        
      const {data: myDetails} = await Axios.home();
      // console.log(myDetails);
      setsetMyData(myDetails);
    } catch (error) {
        console.log("You are not authenticated");
        navigate('/login');
    }
  }
  
  useEffect(() => {
    checkAuth();
    fetchAllAstrologer();
  }, [])

  const callToAstrologer = (astroData) => {
    setShowDialing(true);
    setOpen(true);
    const data = {
      astroId: astroData._id,
      userId : myData.userId,
      userPhone: myData.phone,  
    }
    setDetails(data);
    socket.emit('callToAstrologer', data);
  }


  socket.on('callRejected', (userId) => {
    if(myData.userId === userId){
      setShowDialing(false);
    }
  })

  return (
    <>
      <h1 style={styles.h1Heading}>Let's Talk with your favourite Astrologer</h1>

      <div style={styles.fullContainer, styles.flex}>
        {
          allAstro.map((item, index) => {
            return <AstroCard key={item._id} id={item._id} action={() => callToAstrologer(item)} name={item._id} buttonName="Call"/>
          })
        }
      </div>
      {
        showDialing && <DialingModal socket={socket} open={open} handleClose={handleClose}/>
      }
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