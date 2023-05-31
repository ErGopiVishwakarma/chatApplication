import React from 'react'
import {Route, Routes} from 'react-router-dom'
import HomePage from './HomePage'
import Chat from './Chat'
import Login from './Login'
import Signup from './Signup'

const AllRoute = () => {
  return (
     <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path='/login' element={<Login />} />
         <Route path='signup' element={<Signup />} />
         <Route path='/chat' element={<Chat />} />
     </Routes>
  )
}

export default AllRoute