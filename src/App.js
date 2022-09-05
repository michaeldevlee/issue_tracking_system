import { BrowserRouter as Router ,Route, Routes, Link } from 'react-router-dom';
import './App.css';
import AddIssue from './components/AddIssue';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';


function App() {
  return (
    <Router>
    <div className="App">
      <Navbar/>
        <div className="pages">
          <Link to='/'>Home</Link>
          <Link to="/issues/add">Add</Link>
        </div>
        <Routes>
      <Route path ='/issues/add' exact element={AddIssue}/>
      <Route path ='/' exact element= {Home}/>
     
    </Routes>
    </div>
    
    </Router>
  );
}

export default App;
