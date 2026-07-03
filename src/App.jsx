import Login from '../pages/login.jsx'
import Signup from '../pages/registration.jsx'
import Home from '../pages/home.jsx'
import {Analytics} from '@vercel/analytics/react'
import { BrowserRouter, Routes, Route } from 'react-router'
import Landing from '../pages/landing.jsx'
import { ToastProvider } from './components/ui/toast.jsx'

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signUp' element={<Signup/>}/>
          <Route path='/dashboard' element={<Home/>}/>
        </Routes>
      </BrowserRouter>
      <Analytics/>
    </ToastProvider>
  )
}

export default App
