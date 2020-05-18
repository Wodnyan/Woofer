import React from 'react';
import Description from "./Description.jsx"
import ExpandingCard from "../expanding_card/ExpandingCard.jsx"
import Switch from "../switch/Switch.jsx"
//TODO: Light mode
function Settings(props){
  return (
    <div style={{marginTop: "80px"}}>
      <ExpandingCard cardName={"Description"}>
        <Description />
      </ExpandingCard>
      <ExpandingCard cardName={"Light Mode"}>
        <h1 style={{color: "black"}}>Switch to light mode</h1>
        <Switch />
      </ExpandingCard>
    </div>
  )
}
export default Settings;
