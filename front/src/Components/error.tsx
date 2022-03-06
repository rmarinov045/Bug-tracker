import React from 'react'

function ErrorField(errorMessage: string) {

  return (
     <div className="font-bold h-10 bg-red-500 mt-4 w-full rounded-xl items-center flex justify-center text-white">{errorMessage}</div>
  )
}

export default ErrorField