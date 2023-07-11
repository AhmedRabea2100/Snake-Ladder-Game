import { useState } from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import Auth from "./components/Auth"
import Rooms from './components/Rooms.jsx'
import {  Routes, Route } from "react-router-dom"


function App() {
  return (
      <Routes>
        <Route path="/Auth" element={<Auth />} />
        <Route path="/rooms" element={ <Rooms/> } />
      </Routes> 
  )
}

export default App
