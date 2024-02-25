import React from 'react'

function printAfterColon(text) {
  const lastColonIndex = text.lastIndexOf(':');
  if (lastColonIndex !== -1) {
    return text.slice(lastColonIndex + 1)
  } else {
    return text;
  }
 }

const ConversationCard = ({handlePromptSubmit,heading,text,suggestedTopics=[]}) => {
  return (
    <div className='bg-sec flex-center flex-col gap-4 rounded-lg p-2 sm:p-6 w-11/12 sm:w-3/5'>
        <h1 className=' text-xl font-bold w-11/12 text-left'>{printAfterColon(heading)}</h1>
        <p className='w-11/12 text-left'>{text}</p>
        <h1 className=' text-xl font-bold w-11/12 text-left'>Suggested Topics</h1>
        <div className='flex-center flex-col gap-1 w-full'>
            {
                (suggestedTopics.map((topic,index)=>
                    <button 
                      key={index} 
                      onClick={(e)=>{handlePromptSubmit(e, 'Topic: ( ' + topic + ') in Context of ( ' + heading + ' ) ')}}
                      className='w-11/12 text-left button px-4 py-2'>{topic}</button>
                ))
            }
        </div>
    </div>
  )
}

export default ConversationCard