import React from 'react'

function SearchField({ handleSearch } :{handleSearch: Function}) {
    return (
        <div className='flex relative gap-2 mb-2 mt-4 items-center justify-center'>
            <input onChange={(e) => handleSearch(e.target.value)} className='border-b-2 w-32 border-slate-200 transition ease-in-out 150 focus:border-green-500 focus:outline-none p-1 pl-2 text-sm bg-transparent' placeholder='Search issues....' type="text" name="search" id="search" />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>
    )
}

export default SearchField