
import React, {useState} from 'react'
import { NavLink } from "react-router-dom";
import {AstroAxios} from '../../https/index.js';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux'
import {setOtp} from '../../store/authSlice.js';

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

  const [state, setState] = useState({
    name: "",
    phone: ""
  });
  const navigate = useNavigate();
  const dispatch = useDispatch('');

  
  const enterDetails = async (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }


  const submitDetails = async () => {
    try {
      const {data} = await AstroAxios.sendOTP({name : state.name, phone: state.phone});
      console.log(data);
      dispatch(setOtp({phone : state.phone, 'hashedOTP' : data.hashedOTP})); 
      navigate('/astrologer/otp');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
        <h2>Login</h2>
        <div>
            <p>Enter Name:</p>
            <input type="text" onChange={enterDetails} name="name" value={state.name}/>
            <p>Enter Phone Number:</p>
            <input type="text" onChange={enterDetails} name="phone" value={state.phone}/>
            <br/>
            <div style={styles.container}>
              <button onClick={submitDetails}>Submit</button>
            </div>
        </div>
    </div>
  )
}

export default Login