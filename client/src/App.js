import { BrowserRouter as Router ,Route, Routes, Link } from 'react-router-dom';
import './App.css';
import AddIssue from './components/Issues/AddIssue';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import {UserProvider} from './contexts/userContext'
import { useState } from 'react';
import { useEffect } from 'react';
import ViewIssue from './components/Issues/ViewIssue';
import Account from './components/Account/Account';
import getBaseUrl from './utils/getBaseUrl';


function App() {
  const user = localStorage.getItem('user');
  
  const [userName, setUserName] = useState('');
  const [projects, setProjects] = useState('');
  const [roles, setRoles] = useState('');
  const [currentProjectViewed, setCurrentProjectViewed] = useState('');
  const [inviteUserModalStatus , setInviteUserModalStatus] = useState(false);
  const [profile , setProfile ] = useState(false);

  const getProjects = async () => {
      const options = {
          method : 'GET',
          credentials: 'include',
          withCredentials : true,
          headers : {
              'Accept': 'application/json',
              'Content-Type' : 'application/json',
              'Access-Control-Allow-Credentials': true
          },

      }

      const response = await fetch (getBaseUrl() +'/projects/getProjects', options);
      const data = await response.json();

      if (data.projects){
        setProjects(data.projects)
      }
      else{
        localStorage.clear();
        window.location.reload(false);
      }
      
      
  }

  const getRole = async ()=>{
      const options = {
          method : 'POST',
          body : JSON.stringify({
              project_id : currentProjectViewed._id,
          }),
          credentials: 'include',
          headers : {
              'Accept': 'application/json',
              'Content-Type' : 'application/json',
              'Access-Control-Allow-Credentials': true
          },

      }

      const response = await fetch (getBaseUrl() +'/roles/getRole', options);
      const data = await response.json();
      setRoles(data.role)
      console.log('getting role')
  }

  const home = <Home
    setInviteUserModalStatus={setInviteUserModalStatus} 
    projects={projects} 
    setCurrentProjectViewed={setCurrentProjectViewed}
    currentProjectViewed={currentProjectViewed}
    inviteUserModalStatus={inviteUserModalStatus}
  />

  const account = <Account
    projects={projects}
  />


  useEffect(()=>{
      const user = localStorage.getItem('user')
      if (user){
          setUserName(JSON.parse(user).user.userName)
          getProjects();
          getRole();
      }
  },[])
  return (
    <UserProvider>
      <Router>
      <div className="App">
      <Routes>  
        <Route path = '/login' element={user ? home: <Login/>}></Route>
        <Route path ='/' exact element= { user ? home : <Login/>}/>
        <Route path ='/profile' element= { user ? account : <Login/>}/>
        <Route path ='/signup' element={user ? home : <SignUp/>}></Route>
        <Route path ='/view/:id' element={user ? <ViewIssue/> : <Login/>}></Route>
      </Routes>
      </div>
      
      </Router>
    </UserProvider>
  );
}

export default App;
