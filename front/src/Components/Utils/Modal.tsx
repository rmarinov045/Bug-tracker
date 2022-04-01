import React from 'react'

function Modal(props :any) {
    const message = props.message
    const bgColor = props.bgColor

    return (
        message > 0 ? 
            <div style={{backgroundColor: bgColor}} className='fixed transform -translate-x-1/2 min-h-fit p-1 top-0 left-1/2 font-bold text-white w-full flex items-center justify-center'>{message}</div>
            : <></>
  )
}

export default Modal