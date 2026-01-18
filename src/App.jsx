import Login from '../pages/login.jsx'
import Signup from '../pages/registration.jsx'
import Home from  '../pages/home.jsx'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import Landing from '../pages/landing.jsx'


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signUp' element={<Signup/>}/>
      <Route path='/dashboard' element={<Home/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
