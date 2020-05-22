import React, {useState} from 'react';
import Description from "./Description.jsx"
import ExpandingCard from "../expanding_card/ExpandingCard.jsx"
import SwitchSlider from "../switch/Switch.jsx"
import DeleteUserPrompt from "../delete_user_prompt/DeleteUserPrompt.jsx"
function Settings(props){
  const {setDarkMode, darkMode} = props;
  const [prompt, setPrompt] = useState(false);
  const handleClick = () => {
    setDarkMode(prevState => {
      localStorage.setItem("darkMode", !prevState)
      return !prevState
    });
  }
  console.log(prompt)
  return (
    <div style={{marginTop: "80px"}}>
      <ExpandingCard cardName={"Description"}>
        <Description />
      </ExpandingCard>
      <ExpandingCard cardName={"Light Mode"}>
        <h1>Switch to light mode</h1>
        <SwitchSlider handleClick={handleClick} defaultValue={darkMode}/>
      </ExpandingCard>
      <ExpandingCard cardName={"Profile picture"}>
        <div>
          <h1>Change your profile picture</h1>
        </div>
      </ExpandingCard>
      <ExpandingCard cardName={"Delete Account"}>
        <div>
          <button onClick={() => setPrompt(true)}>Delete Account</button>
        </div>
      </ExpandingCard>
      {prompt && <DeleteUserPrompt exit={() => setPrompt(false)} />}
    </div>
  )
}
export default Settings;
