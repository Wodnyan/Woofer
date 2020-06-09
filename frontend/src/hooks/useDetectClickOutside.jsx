import React, {useState, useEffect, useRef} from "react"

export default function useDetectClickOutside(displayInit) {
	const ref = useRef(null)
  //Make this a param
	const [display, setDisplay] = useState(displayInit)
  useEffect(() => {
    const handle = (e) => {
      if(ref.current && 
        !ref.current.contains(e.target)){
        setDisplay(!display)
      }
    }
    document.addEventListener("click", handle)
    return () => {
      document.removeEventListener("click", handle)
    }
  }, [display])
	return {ref, display, setDisplay};
}