import React from 'react';
import Typography from '@mui/material/Typography';

const styles = {
  container: {
    display: 'inline-block',
    border: '1px solid black',
    borderRadius: '20px',
    justifyContent: 'flex-start',
    padding: '10px',
    maxWidth: '50%',
    wordWrap: 'break-word',
  },
  box: {
    display: 'flex',
    justifyContent: 'flex-start',
    margin: '20px 0',
  },
};

const Receiver = (props) => {
  return (
    <div style={styles.box}>
        <div style={styles.container}>
            <Typography>{props.text}</Typography>
        </div>
    </div>
  );
};

export default Receiver;
