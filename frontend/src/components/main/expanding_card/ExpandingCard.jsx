import React, {useState} from "react"
import style from "./ExpandingCard.scss"

export default function ExpandingCard(props) {
  const {cardName} = props;
  const [visible, setVisible] = useState(false)
    return(
    <div className="expanding-card-container">
      <div onClick={() => setVisible(!visible)}>
        <h1 className="expanding-title">{cardName}</h1>
      </div>
      <div className={"expanding-children" + (!visible ? "" : " expanding-children--visible")}>
        {props.children}
      </div>
    </div>
  ) 
}

