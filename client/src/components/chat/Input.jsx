import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Axios from '../../https/index.js';

const styles = {
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    width: '100%',
    marginRight: '8px',
  },
};

const Input = ({ type, placeholder, value, handleChat, data, handleSendClick }) => {


  return (
    <div style={styles.inputContainer}>
      <TextField
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChat}
        style={styles.input}
      />
      <Button variant="contained" onClick={() => handleSendClick(data, value)}>
        Send
      </Button>
    </div>
  );
};

export default Input;
