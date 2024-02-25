import React from 'react'
import { useState } from 'react'

const QuizCard = ({index,quiz,handleGetColor,handleOptionClick,submitted=false,selectedOption=null}) => {

  return (
    <div key={index} className='p-8 bg-sec rounded-lg text-xl w-11/12'>
        <div className='mb-6 text-2xl text-gradient-primary font-bold'>
            <h1>{quiz.QuestionNumber + " ) " + quiz.Question}</h1>
        </div>
        <div className='flex-center flex-col gap-4 w-full'>
            <div 
                onClick={() => handleOptionClick(index, 'A')}
                className={`
                cursor-pointer rounded-md border-2 border-solid hover:border-pink-500 w-full py-2 px-4 text-sm sm:text-lg
                ${handleGetColor(index,'A')}
                `}
            >
                { "A ) " + quiz.A }
            </div>
            <div 
            onClick={() =>handleOptionClick(index, 'B')}
            className={`
                cursor-pointer rounded-md border-2 border-solid hover:border-pink-500 w-full py-2 px-4 text-sm sm:text-lg
                $${handleGetColor(index,'B')}
            `}
        >
                { "B ) " + quiz.B }
            </div>
            <div 
                onClick={() =>handleOptionClick(index, 'C')}
                className={`
                cursor-pointer rounded-md border-2 border-solid hover:border-pink-500 w-full py-2 px-4 text-sm sm:text-lg
                ${handleGetColor(index,'C')}
                `}
            >
                { "C ) " + quiz.C }
            </div>
            <div
                onClick={() =>handleOptionClick(index, 'D')}
                className={`
                cursor-pointer rounded-md border-2 border-solid hover:border-pink-500 w-full py-2 px-4 text-sm sm:text-lg
                ${handleGetColor(index,'D')}
                `}
            >
                { "D ) " + quiz.D }
            </div>
        </div>
        {
            (submitted)
                ?
                    <div className='py-2'>
                        <h1 >
                            You Answered : {`${(selectedOption)?selectedOption:"Not Attempted"}`} 
                        </h1>
                        <h1>
                            Correct Answer : {`${quiz.CorrectAnswer}`} 
                        </h1>
                        <h1 >
                            Explanation : {`${quiz.Explanation}`}
                        </h1>
                    </div>
                :
                    null
        }
    </div>  
  )
}

export default QuizCard