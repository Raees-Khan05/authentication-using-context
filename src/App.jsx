import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './PAGES/Home'
import Signin from './PAGES/Signin'
import Signup from './PAGES/Signup'
import Header from './Components/Header'
import Steps from './PAGES/Steps'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/steps' element={<Steps/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
