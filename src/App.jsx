import Login from '../pages/login'
import Signup from '../pages/registration'
import Home from  '../pages/home'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import Landing from '../pages/Landing'

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
