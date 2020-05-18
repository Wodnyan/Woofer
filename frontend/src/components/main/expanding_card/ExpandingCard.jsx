import React, {useState, useRef} from "react"
import style from "./ExpandingCard.scss"

export default function ExpandingCard(props) {
  const {cardName} = props;
  const [visible, setVisible] = useState(false)
  const ref = useRef(null);
  const handleClick = () => {
    setVisible(!visible)
    const node = ref.current;
    const nodeHeight = node.scrollHeight
    node.style.height = visible ? "0px" : `${nodeHeight}px` 
  }
  //Add a Chevron
    return(
    <div className="expanding-card-container">
      <div onClick={handleClick}>
        <h1 className="expanding-title">{cardName}</h1>
      </div>
      <div ref={ref} className="expanding-children">
        {props.children}
      </div>
    </div>
  ) 
}

