import './App.css';
import Navbar from '../Nav/Navbar'
import Home from '../Home/Home'
import Login from '../Login/Login'
import SignUp from '../Login/SignUp'
import React, { useState, useEffect, createContext } from 'react'
import { Routes, Route } from 'react-router-dom'

export const ParentContext = createContext();

function App() {
  const [items, setItems] = useState([])
  const [users, setUsers] = useState([])
  const [auth, setAuth] = useState()
  const [loggedInUser, setLoggedInUser] = useState('')

  useEffect(() => {
    fetch('http://localhost:3001/items')
      .then(res => res.json())
      .then(data => setItems(data))

    fetch('http://localhost:3001/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  console.log(users)

  return (
    <ParentContext.Provider value={{ items, users, auth, loggedInUser, setLoggedInUser, setAuth, setUsers, setItems}}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </ParentContext.Provider>
  );
}

export default App;
