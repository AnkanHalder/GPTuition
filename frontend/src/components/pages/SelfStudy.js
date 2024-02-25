import React from 'react'
import HeroText from '../page_components/HeroText.js'
import HeroDescription from '../page_components/HeroDescription.js'
import CustomLink from '../page_components/CustomLink.js'
import FeatureCard from '../page_components/FeatureCard.js'

const SelfStudy = () => {
  return (
    <div className='page min-h-screen w-screen overflow-x-hidden overflow-y-auto'>
        <HeroText span={" GPTuition SelfStudy "} />
        <HeroDescription text={"Unleash your inner learner with GPTuition's comprehensive self-study feature. Dive deep into any topic – from science and history to literature and current affairs – by generating personalized, AI-powered notes in PDF format. These concise and informative summaries act as a springboard for further exploration. Test your understanding through engaging quizzes tailored by AI to match your chosen subject, and compare your results with students worldwide to gain valuable insights into your strengths and areas for improvement. Delve deeper into existing PDFs using GPTuition's innovative query and learning function. Turn complex documents into easily digestible information through specific questions, allowing you to extract precise details and gain a deeper understanding of the content. With GPTuition's self-study feature, you'll be empowered to take charge of your learning journey, anytime, anywhere. "} />
        <h1 className='text-xl font-semibold text-center my-10'>
          Start Learning Something Amazing !!
        </h1>
        <div className='flex-center flex-col gap-16 my-10'>
          <FeatureCard
            heading={" Generate Notes And Resources "}
            desc={"Dive deep into any topic – from science and history to literature and current affairs – by generating personalized, AI-powered notes in PDF format. These concise and informative summaries act as a springboard for further exploration. The AI also offers Topics Suggestions for further Exploration "}
            colorScheme={" bg-sec "}
            text={"Generate Notes"}
            href={"/generateNotes"}
          />
           <FeatureCard
            heading={" Learn From A PDF "}
            desc={"  Delve deeper into existing PDFs using GPTuition's innovative query and learning function. Turn complex documents into easily digestible information through specific questions, allowing you to extract precise details and gain a deeper understanding of the content. "}
            colorScheme={" bg-sec "}
            text={" Learn PDF "}
            href={"https://suchananag002-pdfquerying-manage-dvpdoz.streamlit.app/"}
          />
           <FeatureCard
            heading={" Take A Quiz "}
            desc={" Test your understanding through engaging quizzes tailored by AI to match your chosen subject, and compare your results with students worldwide to gain valuable insights into your strengths and areas for improvement. "}
            colorScheme={" bg-sec "}
            text={"Take A Quiz"}
            href={"/selfstudy/take_quiz"}
          />
        </div>
    </div>
  )
}

export default SelfStudy