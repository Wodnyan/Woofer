import React from 'react'
import "./Load.scss"
export default function Load(props){
  return(
    <div className="loader-container">
      <div className="loader__bubble loader__bubble--1"></div>
      <div className="loader__bubble loader__bubble--2"></div>
      <div className="loader__bubble loader__bubble--3"></div>
    </div>
  )
}
export function CircularLoader() {
	return (
		<div className="circular-loader">
		</div>
	)
}
