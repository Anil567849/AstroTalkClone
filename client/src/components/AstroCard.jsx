import React from 'react'
import { Card, CardContent, Typography, Button } from '@mui/material';


function AstroCard(props) {
  // console.log(props);
  return (
    <Card sx={{ maxWidth : 400 }}>
      <CardContent>
        <Typography variant="h5" component="div">
            {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This is a sample card created using Material-UI in React.js
        </Typography>
        <Button sx={{marginTop: 2}} variant="contained" onClick={props.action}>{props.buttonName}</Button>
      </CardContent>
    </Card>
  )
}

export default AstroCard