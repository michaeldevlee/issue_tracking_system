
import { BrowserRouter as Router, Routes, Route, Switch, Link } from "react-router-dom";


const Navbar = () => {

    let authenticated = false;
    if (localStorage.getItem('user')){
        authenticated=true;
    }

    const handleLogOut = async () => {
        const options = {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json'
            }
        }

        const response = await fetch ('/logout', options)
        const data = await response.json();
        console.log(data);
        localStorage.removeItem('user');
        window.location.reload(false);
    }

    return ( 
        <nav className="navbar">
            <div>
                <Link to='/'><button className="navbar-button">Home</button></Link>
                <Link to='profile'><button className="navbar-button">Account</button></Link>
                <Link to ='issues/add'><button className="navbar-button">Add Issue</button></Link>
            </div>
            <div>
                {authenticated ? <button onClick={handleLogOut} className="navbar-button">Logout</button>: null }
                
            </div>
        </nav>
     );
}
 
export default Navbar;