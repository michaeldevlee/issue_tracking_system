import { BrowserRouter as Router ,Route, Routes, Link } from 'react-router-dom';
import './App.css';
import AddIssue from './components/Issues/AddIssue';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import {UserProvider} from './contexts/userContext'
import { useState } from 'react';
import { useEffect } from 'react';


function App() {
  const user = localStorage.getItem('user');
  console.log(user)

  return (
    <UserProvider>
      <Router>
      <div className="App">
        <Navbar />
          <div className="pages">
            <Link to='/'>Dashboard</Link>
            <Link to="/issues/add">Add</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
          <Routes>  
        <Route path = '/login' element={user ? <Home/>: <Login/>}></Route>
        <Route path ='/issues/add' exact element={user ? <AddIssue/> : <Login/>}/>
        <Route path ='/' exact element= { user ? <Home/> : <Login/>}/>
        <Route path ='/signup' element={user ? <Home/> : <SignUp/>}></Route>
      </Routes>
      </div>
      
      </Router>
    </UserProvider>
  );
}

export default App;
