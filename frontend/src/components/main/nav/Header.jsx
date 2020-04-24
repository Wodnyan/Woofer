import React from 'react';
import style from "./style/Nav.scss"
export default function(props){
  return(
    <header className="header">
      {props.children}
    </header>
  )
}
