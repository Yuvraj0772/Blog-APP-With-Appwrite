// build companent 
import React from 'react'


function Container({children}) {
  return (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block mx-auto px-4'>
        {children}
      </div>
    </div>
  )
}

export default Container
