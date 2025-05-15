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
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/home' element={<Home/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
