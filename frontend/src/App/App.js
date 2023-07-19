import './App.css';
import Navbar from '../Nav/Navbar'
import Home from '../Home/Home'
import Login from '../Login/Login'
import SignUp from '../Login/SignUp'
import Inventory from '../Inventory/Inventory'
import Item from '../Item/Item'
import AddItem from '../Item/AddItem'
import React, { useState, useEffect, createContext } from 'react'
import { Routes, Route } from 'react-router-dom'

export const ParentContext = createContext();

function App() {
  const [items, setItems] = useState([])
  const [users, setUsers] = useState([])
  const [auth, setAuth] = useState(undefined || JSON.parse(sessionStorage.getItem('auth')))
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(sessionStorage.getItem('loggedInUser')))

  useEffect(() => {
    fetch('http://localhost:3001/items')
      .then(res => res.json())
      .then(data => setItems(data))

    fetch('http://localhost:3001/users')
      .then(res => res.json())
      .then(data => setUsers(data))

    sessionStorage.setItem('auth', JSON.stringify(auth))
    sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))
  }, [auth, loggedInUser])

  return (
    <ParentContext.Provider value={{ items, users, auth, loggedInUser, setLoggedInUser, setAuth, setUsers, setItems}}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/item/:item" element={<Item />} />
        <Route path="/additem" element={<AddItem />} />
      </Routes>
    </ParentContext.Provider>
  );
}

export default App;
