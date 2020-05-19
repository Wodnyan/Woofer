import React from 'react';
import Description from "./Description.jsx"
import ExpandingCard from "../expanding_card/ExpandingCard.jsx"
import SwitchSlider from "../switch/Switch.jsx"
//TODO: Light mode
function Settings(props){
  const {setDarkMode, darkMode} = props;
  return (
    <div style={{marginTop: "80px"}}>
      <ExpandingCard cardName={"Description"}>
        <Description />
      </ExpandingCard>
      <ExpandingCard cardName={"Light Mode"}>
        <h1 style={{color: "black"}}>Switch to light mode</h1>
        <SwitchSlider handleClick={() => setDarkMode(prevState => !prevState)} defaultValue={darkMode}/>
      </ExpandingCard>
      <ExpandingCard cardName={"Profile picture"}>
        <div>
          <h1 style={{color: "#000"}}>Change your profile picture</h1>
        </div>
      </ExpandingCard>
    </div>
  )
}
export default Settings;
