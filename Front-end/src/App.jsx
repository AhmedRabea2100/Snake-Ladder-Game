import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
//import Auth from "./components/Auth"
import Auth from "./components/Auth"
import {  Routes, Route } from "react-router-dom"


function App() {
  return (
    
      <Routes>
        <Route path="/Auth" element={<Auth />} />
      </Routes>
    
  )
}

export default App
