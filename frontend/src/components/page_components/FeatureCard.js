import React from 'react'
import CustomLink from './CustomLink'

const FeatureCard = ({heading,desc,padding,colorScheme,text,href,}) => {
  return (
    <div className='feature-card bg-sec relative'>
        <div className='feature-card-blur absolute -z-10 top-0 left-0 h-full w-full pointer-events-none blur-sm bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500'></div>
        <div className='feature-card-content h-full w-full flex flex-col gap-3'>
            <h1 className='my-4 text-2xl font-bold'>{heading}</h1>
            <CustomLink 
                colorScheme={colorScheme}
                text={text}
                padding={padding}
                href={href}
            />
            <p className='my-4 text-base'>
                {desc}
            </p>
        </div>
    </div>
  )
}

export default FeatureCard