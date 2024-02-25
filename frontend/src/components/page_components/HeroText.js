import React from 'react'

const HeroText = (props) => {
  return (
    <div className={` p-6 pb-0 text-hero font-bold ${(props.left)?'text-left':'text-center'} w-full`}>
        <h1 className={`${(props.left)?'text-left':'text-center'}`}>{props.heading}<span className='text-gradient-primary w-max'>{props.span}</span></h1>
    </div>
  )
}

export default HeroText