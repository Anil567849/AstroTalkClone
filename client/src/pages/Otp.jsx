
import React, {useState, useEffect} from 'react'
import { NavLink } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import Axios from '../https/index.js';

const styles = {
    container: {
      display: "inline-block",
      border: '2px solid black',
      padding: '2rem',
      textAlign: 'center',
      cursor: 'pointer',
      marginTop: '10px'
    },
    text: {
      fontSize : '40px',
      color: 'black',
      textDecoration: 'none',
    }
}



  function Otp() {

    const hashedOtp = useSelector(state => state.auth.hashedOtp);
    const phone = useSelector(state => state.auth.phone);
    const [otp, setOtp] = useState("55555");
    const navigate = useNavigate();
    
    useEffect(() => {
      if(!hashedOtp){
        navigate('/login');
      }
    }, [])


    const enterOtp = async (e) => {
      setOtp(e.target.value);
    }

    const submitOtp = async () => {
      console.log(phone);
  
      const {data} = await Axios.verifyOTP({phone, otp, hashedOtp});
      if(data.verified){
        navigate('/');
      }else{
        if(data.data === null){
          alert('wrong otp');
        }else{
          alert('otp has expired');
          navigate('/login');
        }
      }
    }
  return (
    <div>
        <h2>Login</h2>
        <div>
            <p>Enter OTP:</p>
            <input type="text" onChange={enterOtp} name="otp" value={otp}/>
            <br/>
            <div style={styles.container}>
              <button onClick={submitOtp}>Submit</button>
            </div>
        </div>
    </div>
  )
}

export default Otp