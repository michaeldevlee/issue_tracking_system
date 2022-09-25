
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
        localStorage.removeItem('user');
        window.location.reload(false);
    }

    return ( 
        <nav className="navbar">
            <div>
                <h1>ProtoFast</h1>
                <Link to='/'><p className="navbar-button">Dashboard</p></Link>
                <Link to='profile'><p className="navbar-button">Account</p></Link>
            </div>
            <div>
                {authenticated ? <p onClick={handleLogOut} className="navbar-button">Logout</p>: null }
                
            </div>
        </nav>
     );
}
 
export default Navbar;