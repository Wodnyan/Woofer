import React from 'react';
import style from "./style/Nav.scss"
export default function(props){
  console.log(props);
  return(
    <header className="header">
      {props.children}
    </header>
  )
}
