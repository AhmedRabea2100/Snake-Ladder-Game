import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
//import Auth from "./components/Auth"
import Auth from "./components/Auth"
import { BrowserRouter, Routes, Route } from "react-router-dom"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
