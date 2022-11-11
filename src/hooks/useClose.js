import { useEffect } from "react";

function useClose() {

  function EscClose(isOpen, handleClose) {
    useEffect(() => {
      if (!isOpen) return;
  
      function handleEsc(e) {
        if (e.key === "Escape") {
          handleClose()
        }
      }
  
      document.addEventListener("keydown", handleEsc);
  
      return () => document.removeEventListener("keydown", handleEsc)
    }, [isOpen]);
  } 
  
  function ClickClose(isOpen, handleClose, openedClass) {
  
    useEffect(() => {
      if(!isOpen) return;
  
      function handleClickClose(e) {
        if (e.target.className.includes(openedClass)) {
          handleClose()
        }
      }
      
      document.addEventListener("mousedown", handleClickClose);    
      return () => {document.removeEventListener("mousedown", handleClickClose)
      }
  
    }, [isOpen])
  }

  return {
    EscClose,
    ClickClose
  }
}

export default useClose;