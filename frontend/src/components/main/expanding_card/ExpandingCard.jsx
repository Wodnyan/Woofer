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
      <div className="expanding-top" onClick={handleClick}>
        <h1 className="expanding-title">{cardName}</h1>
        <svg className={visible ? "chevron chevron--active" : "chevron"} height="35px" viewBox="0 0 512 512" width="35px" xmlns="http://www.w3.org/2000/svg"><path d="m256 512c-68.378906 0-132.667969-26.628906-181.019531-74.980469-48.351563-48.351562-74.980469-112.640625-74.980469-181.019531s26.628906-132.667969 74.980469-181.019531c48.351562-48.351563 112.640625-74.980469 181.019531-74.980469s132.667969 26.628906 181.019531 74.980469c48.351563 48.351562 74.980469 112.640625 74.980469 181.019531s-26.628906 132.667969-74.980469 181.019531c-48.351562 48.351563-112.640625 74.980469-181.019531 74.980469zm0-472c-119.101562 0-216 96.898438-216 216s96.898438 216 216 216 216-96.898438 216-216-96.898438-216-216-216zm138.285156 182-28.285156-28.285156-110 110-110-110-28.285156 28.285156 138.285156 138.285156zm0 0"/></svg>
      </div>
      <div ref={ref} className="expanding-children">
        {props.children}
      </div>
    </div>
  ) 
}

