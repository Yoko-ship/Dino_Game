import React from 'react'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import "./modal.css"
function Modal({isOpened,setIsOpened,children}) {

  
    return createPortal(
    <>
    <dialog open={isOpened}>
        <button onClick={() => setIsOpened(false)}></button>
        {children}
    </dialog>
    </>,document.querySelector("#module")
  )
}

export default Modal