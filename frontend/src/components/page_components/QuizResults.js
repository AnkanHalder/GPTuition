import React from 'react'
import CircularProgressBar from './CircularProgressBar'
import HeroText from './HeroText'
import HeroDescription from './HeroDescription'
import QuizCard from './QuizCard'
import axios from 'axios'

const QuizResults = ({securedSore, totalScore , retakeQuizSetter , handleGetColor,submitBool,quizArray,selectedAnswers}) => {
  console.log("QUIZARRAY is: " , quizArray)

  const generateResult = () => {
    console.log("Sending results: ...... ")
    axios.post('/api/generate_quiz_result',{
      quizData: quizArray,
      selectedOptions: selectedAnswers
    }).then((res)=>{
      console.log(res.data);
      const blob = new Blob([res.data], { type: 'application/pdf' });
      const dataURL = URL.createObjectURL(blob);
      window.open(dataURL, '_blank');

    })
  };

  return (
    <div>
      <HeroText span={" Congratulations!! "} />
      <HeroDescription text={` You Scored A Massive ${securedSore} out of ${totalScore} in the Quiz. Take the Quiz Again or Download the Report. `} />
      <div className="my-8 flex-center flex-col gap-10 w-full">
        <h1 className='font-bold text-2xl text-center'> You Secured : </h1>
        <div className='w-full flex-center'>
          <CircularProgressBar percentage={(securedSore/totalScore)*100} divStyles=" h-48 w-48 " />
        </div>
        <h1 className='font-bold text-2xl text-center'> {`You Secured : ${securedSore} out of ${totalScore} `}</h1>
        <div className="flex-center gap-8 flex-wrap">
          <button 
            className=' button px-6 py-2' 
            onClick={()=>retakeQuizSetter(false)}>
            Retake Quiz
          </button>
          <button
            onClick={()=>{generateResult()}} 
            className=' button px-6 py-2'>
            Download Report
          </button>
        </div>
        <h1 className='font-bold text-2xl text-center'>Your Answers:</h1>
        {(quizArray).map((quiz,index) =>
                        <QuizCard 
                          index={index} 
                          quiz={quiz} 
                          handleGetColor={handleGetColor}
                          submitted={submitBool}
                          selectedOption={(selectedAnswers[index]!==''?selectedAnswers[index]:null)}
                        />  
        )}
      </div>

    </div>
  )
}

export default QuizResults