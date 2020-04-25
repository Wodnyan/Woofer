import React from 'react';
import style from "./Load.scss";
export default function Load(props){
  return(
    <div className="loader-container">
      <div className="loader__bubble loader__bubble--1"></div>
      <div className="loader__bubble loader__bubble--2"></div>
      <div className="loader__bubble loader__bubble--3"></div>
    </div>
  )
}