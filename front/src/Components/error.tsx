import React from 'react'

interface ErrorMessage {
  errorMessage: string
}

function ErrorField(props :ErrorMessage) {  
  return (
     <div className="font-bold p-2 bg-red-500 mt-4 w-full rounded-xl items-center flex justify-center text-white">{props.errorMessage}</div>
  )
}

export default ErrorField