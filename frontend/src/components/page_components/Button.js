import React from 'react'

const Button = ({padding,colorScheme,text,onClick,type}) => {
  return (
    <div>
        <button 
            className={` 
                button 
                ${(padding)?padding:' px-4 py-2 '}
                ${(colorScheme)?colorScheme:' bg-pink-600 text-white'} 
            `}
            type={(type) ? type:"button"}
            onClick={onClick?onClick:()=>{}}
        > 

        {(text) ? text:" Button"}
        
        </button>
    </div>
  )
}

export default Button