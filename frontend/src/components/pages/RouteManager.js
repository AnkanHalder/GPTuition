import React from 'react'
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import SelfStudy from './SelfStudy'
import TakeQuiz from './TakeQuiz'
import GenerateNotes from './GenerateNotes'
import HomePage from './HomePage'
import Classrooms from './Classrooms'
import LoginPage from './LoginPage'
import QueryPDF from './QueryPDF'
import FreeResources from './FreeResources'

const RouteManager = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/selfstudy" element={<SelfStudy/>} />
            <Route path="/selfstudy/take_quiz" element={<TakeQuiz/>} />
            <Route path="/selfstudy/take_quiz/:id" element={<TakeQuiz/>} />
            <Route path="/generateNotes" element={<GenerateNotes/>} />
            <Route path="/queryPDF" element={<QueryPDF/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/freeResources" element={<FreeResources/>} />
        </Routes>
    </Router>
  )
}

export default RouteManager