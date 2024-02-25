import React, { useEffect, useState } from 'react'
import HeroText from '../page_components/HeroText'
import HeroDescription from '../page_components/HeroDescription'
import PromptInput from '../page_components/PromptInput'
import QuizPage from '../page_components/QuizPage'
import AvailableQuizes from '../page_components/AvailableQuizes'
import ApiManager from '../../api_manager/ApiManager'
import {useParams} from "react-router-dom"

const saveQuizToLocalStorage = (newJsonObject) => {
  console.log("Entered Function")
  const data = localStorage.getItem('quiz_data');
  const jsonData =  (data)?JSON.parse(data):[];
  console.log("created jsonData" , jsonData)
  jsonData.push(newJsonObject);
  console.log("addded jsonData" , jsonData)
  localStorage.setItem('quiz_data', JSON.stringify(jsonData));
  console.log("saved jsonData")
}


const TakeQuiz = () => {

  const [quiz, setQuiz] = useState(null);
  const [myQuizzes, setMyQuizzes] = useState([]);
  const [allQuizzes,setAllQuizes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [topic,setTopic] = useState(null);


  let {id} = useParams()

  const fetchData = async () => {
    setLoading(true);
    const data = await ApiManager.getTopQuizes();
    console.log(data)
    setAllQuizes(data)
    setLoading(false);
  };

  const handleSubmit = async (e,prompt) => {
    e.preventDefault();
    setLoading(true); // Indicate loading state
    try {
      const data = await ApiManager.generateQuiz(prompt);
      console.log(data);
      if(data.success){
        setMyQuizzes((prev)=>([data,...prev]))
      } else {
        console.error("Error Generaing Quiz. Network Error or Generation Error");
      }
      setLoading(false);
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  useEffect(()=>{
    fetchData();
    console.log(id)
    if(id){
      ApiManager.getQuiz(id).then((res)=>{
        console.log(res);
        if(res.success){
          const _quiz = JSON.parse(res.data.quiz)
          console.log("QUIZ IS",_quiz)
          setQuiz({
            quiz: _quiz,
            topic: res.data.name,
            quiz_id: id
          });
        }
      })
    }
  },[]);

  return (
    <div className='page min-h-screen w-screen overflow-x-hidden overflow-y-auto'>
        <div className='my-8 w-full flex-center flex-col'>
          {
            (!loading)
            ?
              (quiz)
              ?
                <QuizPage quizArray={quiz.quiz} quiz_id={quiz.quiz_id} topicName={topic}  />
              :
                <>
                  <HeroText span={" Generate A Quiz "} />
                  <HeroDescription text={"Lorem Ipsum is simply dummy text of the printing and typesetting industry.psum is simply dummy text of the printing and typesetting industry.psum is simply dummy text of the printing and typesetting industry"} />
                  <PromptInput handleSubmit={handleSubmit} buttonText={" Generate"} />
                  <AvailableQuizes allQuizzes={myQuizzes} heading={"My Quizzes"} quizSelector={setQuiz} topicSelector={setTopic} />
                  <AvailableQuizes allQuizzes={allQuizzes} quizSelector={setQuiz} topicSelector={setTopic} />
                </>
            :
              <h1 className='text-5xl'>Loading ..... </h1>
          }
        </div>
    </div>
  )
}

export default TakeQuiz