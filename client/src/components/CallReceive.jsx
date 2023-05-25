import React from 'react'
import { Card, CardContent, Typography, Button } from '@mui/material';


function CallReceive(props) {
  return (
    <Card sx={{ maxWidth : 400 , margin: 2}}>
      <CardContent>
        <Typography variant="h5" component="div">
            {props.node.data.userId}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This is a sample card created using Material-UI in React.js
        </Typography>
        <Button sx={{margin: "1rem"}} variant="contained" onClick={() => props.handleAccept('accept', props.node.data.userId)}>Accept</Button>
        <Button sx={{margin: "1rem"}} variant="contained" onClick={() => props.handleAccept('reject', props.node.data.userId)}>Reject</Button>
      </CardContent>
      {props.node.next && <CallReceive node={props.node.next} handleAccept={props.handleAccept}/>}
    </Card>
  )
}

export default CallReceive