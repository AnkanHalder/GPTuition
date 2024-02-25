import React,{useState} from 'react'

const AvailableQuizes = ({heading,allQuizzes,quizSelector,topicSelector}) => {
  const [linkCopied, setLinkCopied] = useState(new Array(allQuizzes.length).fill(false));

  if (!allQuizzes.length) return null

  const shareQuiz = (id,index) => {
    const text = "http://127.0.0.1:8000/selfstudy/take_quiz/"+ id;
    navigator.clipboard.writeText(text);

    console.log("text copied");

    setLinkCopied(prevState => {
      const updated_linkCopied=prevState.map((ele,i)=>{
        if(i===index) ele = true;
        else ele = false;
        return ele;
      })
      return updated_linkCopied;
    });
  }

  const sortByAttempts = (arr) =>
  arr.sort((a, b) => {
    const { numOfAttempts: aAttempts } = a;
    const { numOfAttempts: bAttempts } = b;
    return bAttempts - aAttempts; // Descending order
  });

  const quizzes = sortByAttempts(allQuizzes)
  return (
    <div className='flex-center flex-col gap-2 w-11/12 p-2 my-10'>
        <h1 className='text-2xl mb-6'>{heading?heading:"Available Quizzes"}</h1>
        <table className="w-11/12 lg:w-3/5 border-separate border-spacing-y-4">
          <thead>
            <tr>
              <th>Topic</th>
              <th>Attempts</th>
              <th>AvgScore</th>
              <th>Share Quiz</th>
              <th>Take Quiz</th>
            </tr>
          </thead>
          <tbody>
          {quizzes.map((_quiz,key)=>{ 
                    return(
                      <tr key={key} className=" rounded-lg bg-sec text-white p-4 text-xl gap-3">
                        <td><h1 className='font-semibold px-3'>{_quiz.topicName}</h1></td>
                        <td><h1 className="text-center w-full">{_quiz.numOfAttempts}</h1></td>
                        <td><h1 className="text-center w-full">{_quiz.avgScore}</h1></td>
                        <td>
                          <div className="flex-center w-full h-full">
                            <button
                              onClick={()=>{shareQuiz(_quiz.id,key)}}
                              className='px-4 py-2 my-2 tex-xl font-bold rounded-lg border-2 border-solid border-white hover:border-4 hover:border-pink-500 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 w-max'
                            >
                              {(!linkCopied[key])?"Share Quiz 🔗":"Link Copied ✅"}
                          </button>
                          </div>
                        </td>
                        <td>
                          <div className="flex-center w-full h-full">
                            <button
                              onClick={()=>{quizSelector({"quiz": _quiz.quiz, "quiz_id": _quiz.id });topicSelector(_quiz.topicName)}}
                              className='px-4 py-2 my-2 tex-xl font-bold rounded-lg border-2 border-solid border-white hover:border-4 hover:border-pink-500 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 w-max'
                            >
                              Take Quiz
                          </button>
                          </div>
                        </td>
                      </tr>
                    )
        })}
          </tbody>
        </table>
        
    </div>
  )
}

export default AvailableQuizes