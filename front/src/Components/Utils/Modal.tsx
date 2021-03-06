import React from 'react'

function Modal(props: { message: string, bgColor: string }) {
    const message = props.message
    const bgColor = props.bgColor

    return (
        message ?
            <div style={{ backgroundColor: bgColor }} className='fixed transform -translate-x-1/2 min-h-fit p-1 top-0 left-1/2 font-bold text-white w-2/3 flex items-center justify-center z-10'>{message}</div>
            : <></>
    )
}

export default Modal