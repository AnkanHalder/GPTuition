import React from 'react'
import "../../static/css/index.css"
import RouteManager from './pages/RouteManager'
import Nav from './pages/Nav'
import { AuthContextProvider } from './context/AuthContext'


const App = () => {
  return (
    <div className='min-h-screen w-screen overflow-x-hidden overflow-y-auto'>
        <AuthContextProvider>
          <Nav />
          <RouteManager/>
        </AuthContextProvider>
    </div>
  )
}

export default App