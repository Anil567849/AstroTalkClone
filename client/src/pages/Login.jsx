
import React, {useState} from 'react'
import { NavLink } from "react-router-dom";
import Axios from '../https/index.js';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux'
import {setOtp} from '../store/authSlice.js';

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

  function Login() {

  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch('');

  
  const enterPhone = async (e) => {
    setPhone(e.target.value);
  }


  const submitPhone = async () => {
    try {
      console.log('phone clicked');
      const {data} = await Axios.sendOTP({phone});
      dispatch(setOtp({phone, 'hashedOTP' : data.hashedOTP})); 
      navigate('/otp');      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
        <h2>Login</h2>
        <div>
            <p>Enter Phone Number:</p>
            <input type="text" onChange={enterPhone} name="phone" value={phone}/>
            <br/>
            <div style={styles.container}>
              <button onClick={submitPhone}>Submit</button>
            </div>
        </div>
    </div>
  )
}

export default Login