import React from 'react'
import { NavLink } from "react-router-dom";


const styles = {
  container: {
    display: "inline-block",
    border: '2px solid black',
    padding: '2rem',
    textAlign: 'center',
    cursor: 'pointer',
  },
  text: {
    fontSize : '40px',
    color: 'black',
    textDecoration: 'none',
  }
}

function OptionCards(props) {
  return (
    <div style={styles.container}>
        <NavLink style={styles.text} to={`/${props.slug}`}>
          {props.text}
        </NavLink>
    </div>
  )
}

export default OptionCards