import Login from '../pages/login'
import Signup from '../pages/registration'
import Home from  '../pages/home'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<Signup/>}/>
      <Route path='/dashboard' element={<Home/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
