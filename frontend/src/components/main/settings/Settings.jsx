import React, {useState} from 'react';
import "./style/Settings.scss"
import Description from "./Description.jsx"
import ExpandingCard from "../expanding_card/ExpandingCard.jsx"
import SwitchSlider from "../switch/Switch.jsx"
import DeleteUserPrompt from "../delete_user_prompt/DeleteUserPrompt.jsx"
import UploadPictureForm from "../upload_picture_form/UploadPictureForm.jsx"
function Settings(props){
  const {setDarkMode, darkMode} = props;
  const [prompt, setPrompt] = useState(false);
  const handleClick = () => {
    setDarkMode(prevState => {
      localStorage.setItem("darkMode", !prevState)
      return !prevState
    });
  }
  return (
    <div style={{marginTop: "80px"}}>
      <ExpandingCard cardName={"Description"}>
        <Description />
      </ExpandingCard>
      <ExpandingCard cardName={"Light Mode"}>
        <h1 className="switch-color-modes-text">Switch to light mode</h1>
        <SwitchSlider handleClick={handleClick} defaultValue={darkMode}/>
      </ExpandingCard>
      <ExpandingCard cardName={"Profile picture"}>
        <UploadPictureForm />
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
