import React from 'react'

const HeroDescription = (props) => {
  return (
    <div className='flex-center w-full my-10'>
        <p className='text-center w-full sm:w-2/3 lg:w-7/12 p-6'>
            {props.text}
        </p>
  </div>
  )
}

export default HeroDescription