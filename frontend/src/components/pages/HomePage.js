import React from 'react'
import HeroText from '../page_components/HeroText'
import HeroDescription from '../page_components/HeroDescription'
import CustomLink from '../page_components/CustomLink'

const HomePage = () => {
  return (
    <div className='page min-h-screen w-screen overflow-x-hidden overflow-y-auto'>
        <HeroText heading="Welcome To " span="GPTuition" />
        <HeroDescription text="Our Project is called GPTuition. It offers AI based education options acting as a teaching assistant to teachers or study assistant to students. Several students are unable to study properly due to lack of resources or unable to attend schools or get good notes and unable to join tuition due to rising tuition fees. So GPTuition helps students get AI Generated Notes on topics they want that they can then export as PDF. They can also Query PDFs and summerise them and chat with PDFs. They can also take AI generated quizes and compare their results with everybody worldwide. They can also share the quiz links with their peers. Teachers can use the AI Note Generator feature to quickly generate PDF Notes for their students and also send Quiz links. We also included 3 links to Top Free Libraries like National Digital Library Of India, Project Gutenburg and Open Library " />
        <div className='flex-center gap-4 flex-wrap w-full my-6'>
          <CustomLink colorScheme={" bg-sec "} text={"Watch Video"}/>
          <CustomLink href={"selfstudy"} colorScheme={" bg-sec "} text={" Self-Study "} />
          <CustomLink href={"freeResources"} colorScheme={" bg-sec "} text={" Free Resources "} />
        </div>
    </div>
  )
}

export default HomePage