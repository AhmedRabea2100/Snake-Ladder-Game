import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import './App.css'
import Rooms from './components/Rooms.jsx'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"

function App() {
  return (
    <>
    <Routes>
      <Route path="/rooms" element={ <Rooms/> } />
    </Routes>
    </>
  )
}

export default App
