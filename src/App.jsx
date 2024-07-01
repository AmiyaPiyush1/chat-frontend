import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom';

import Signup from '../src/components/signup'
import Mainchat from './components/mainchat'
import Login from './components/login'
import Page1 from './components/page1'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup />}/>
        <Route path='/chat' element={<Mainchat />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/Page1' element={<Page1 />}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
