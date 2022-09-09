import { BrowserRouter as Router ,Route, Routes, Link } from 'react-router-dom';
import './App.css';
import AddIssue from './components/Issues/AddIssue';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';


function App() {
  return (
    <Router>
    <div className="App">
      <Navbar/>
        <div className="pages">
          <Link to='/'>Home</Link>
          <Link to="/issues/add">Add</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
        <Routes>
      <Route path = '/login' element={<Login/>}></Route>
      <Route path ='/issues/add' exact element={<AddIssue/>}/>
      <Route path ='/' exact element= {Home}/>
      <Route path ='/signup' element={<SignUp/>}></Route>
    </Routes>
    </div>
    
    </Router>
  );
}

export default App;
