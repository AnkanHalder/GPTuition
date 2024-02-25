import React, { useState } from 'react'
import HeroText from './HeroText';
import HeroDescription from './HeroDescription';
import QuizCard from './QuizCard';
import QuizResults from './QuizResults';
import ApiManager from '../../api_manager/ApiManager';

const QuizPage = ({quiz_id,quizArray,topicName}) => {
    const [selectedAnswers, setSelectedAnswers] = useState(new Array(quizArray.length).fill(''));
    const [submit,setSubmit] = useState(false);

    const handleOptionClick = (index, option) => {
        setSelectedAnswers((prevAnswers) => {
        const newAnswers = [...prevAnswers];
        newAnswers[index] = option;
        return newAnswers;
        });
    };

    const handleScrollToTop = async() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const handleSubmit = () => {
        setSubmit((prev) => (!prev));
        console.log(ApiManager.submitQUiz({
            id: quiz_id,
            score: getSecuredScore()
        }))
    };
    const getTotalScore = () => {
        return quizArray.length
    }
    const getSecuredScore = () => {
        let securedScore = 0;
        for (let i = 0; i < selectedAnswers.length; i++) {
          if (selectedAnswers[i] === quizArray[i].CorrectAnswer) {
            securedScore++;
          }
        }
        return securedScore;
    };

    const handleGetColor = (index, optionToCheck) => {
        if(!submit){
            if(selectedAnswers[index] == optionToCheck) return ' bg-black text-pink-500 border-black shadow-xl font-bold border-4 '
            else return ' border-slate-100 '
        } else {
            if(optionToCheck == quizArray[index].CorrectAnswer) return ' bg-black text-white border-green-500 font-bold border-4 '
            else if(optionToCheck == selectedAnswers[index]) return ' bg-black text-white border-red-500 font-bold border-4 '
        }
    };

    return (
        <div className='flex-center flex-col gap-6 w-full'>
            {
                (!submit)?
                <>
                    <HeroText span={topicName + ' Quiz '} />
                    <HeroDescription text={`Take A Quiz on ${topicName}\n. \n Lorem Ipsum is simply dummy text of the printing and typesetting industry.psum is simply dummy text of the printing and typesetting industry.psum is simply dummy text of the printing and typesetting industry`} />
                    {(quizArray).map((quiz,index) =>
                        <QuizCard index={index} quiz={quiz} handleGetColor={handleGetColor} handleOptionClick={handleOptionClick} />  
                    )}
                    <button
                        onClick={()=>{handleScrollToTop().then(handleSubmit)}}
                        type="button" // Not a submit button
                        className='rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-violet-500 px-6 py-2 text-2xl my-6'
                    >
                        Submit Quiz
                    </button>
                </>
                :
                <QuizResults 
                    quizArray={quizArray}
                    securedSore={getSecuredScore()} 
                    totalScore={getTotalScore()}
                    retakeQuizSetter={setSubmit}
                    handleGetColor={handleGetColor}
                    submitBool={submit} 
                    selectedAnswers={selectedAnswers}
                />
            }
        </div>
    )
}

export default QuizPage