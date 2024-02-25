import React from 'react'

const CustomLink = ({padding,colorScheme,text,href}) => {
  return (
    <div 
      className={` 
          button w-max  
        ${(padding)?padding:' px-6 py-3 '}
        ${(colorScheme)?colorScheme:' bg-pink-600 text-white '} 
    `}>
        <a 
            href={(href)?href:""}
        > 

        <h1>{(text) ? text:" Button"}</h1>
        
        </a>
    </div>
  )
}

export default CustomLink