import React from 'react';
import Description from "./Description.jsx"
import ExpandingCard from "../expanding_card/ExpandingCard.jsx"
import TextBox from "../nav/TextBox.jsx"
//TODO: Light mode
//TODO: Make ExpandingCards
function Settings(props){
  return (
    <div style={{marginTop: "80px"}}>
      <ExpandingCard cardName={"Description"}>
        <Description />
      </ExpandingCard>
      <ExpandingCard cardName={"Light Mode"}>
        <Description />
      </ExpandingCard>
    </div>
  )
}
export default Settings;
