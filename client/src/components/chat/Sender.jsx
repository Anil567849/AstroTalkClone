import React from 'react';
import Typography from '@mui/material/Typography';

const styles = {
    container: {
      display: 'inline-block',
      border: '1px solid cyan',
      borderRadius: '20px',
      justifyContent: 'flex-end',
      padding: '10px',
      maxWidth: '50%',
      wordWrap: 'break-word',
    },
    box: {
      display: 'flex',
      justifyContent: 'flex-end',
      margin: '20px 0',
    },
  };
  

const Sender = (props) => {
  return (
    <div style={styles.box}>
        <div style={styles.container}>
            <Typography>{props.text}</Typography>
        </div>
    </div>
  );
};

export default Sender;
