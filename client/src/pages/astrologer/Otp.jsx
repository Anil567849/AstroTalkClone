
import React, {useState, useEffect} from 'react'
import { NavLink } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {AstroAxios} from '../../https/index.js';
import { useDispatch } from 'react-redux'
import {setUserData} from '../../store/authSlice.js';

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
    const dispatch = useDispatch('');


    useEffect(() => {
      if(!hashedOtp){
        navigate('/astrologer/login');
      }
    }, [])


    const submitOtp = async () => {
      console.log(phone);
      
      try {
        const {data} = await AstroAxios.verifyOTP({phone, otp, hashedOtp});
        if(data.verified){
          dispatch(setUserData({userId : data.userId, phone}));
          navigate('/astrologer/home');
        }else{
          if(data.data === null){
            alert('wrong otp');
          }else{
            alert('otp has expired');
            navigate('/astrologer/login');
          }
        }        
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <div>
        <h2>Login</h2>
        <div>
            <p>Enter OTP:</p>
            <input type="text" onChange={(e) => setOtp(otp)} name="otp" value={otp}/>
            <br/>
            <div style={styles.container}>
              <button onClick={submitOtp}>Submit</button>
            </div>
        </div>
    </div>
  )
}

export default Otp