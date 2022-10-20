
import { BrowserRouter as Router, Routes, Route, Switch, Link, useNavigate } from "react-router-dom";
import getBaseUrl from "../../utils/getBaseUrl";

const Navbar = () => {
    const navigate = useNavigate();

    let authenticated = false;
    if (localStorage.getItem('user')){
        authenticated=true;
    }

    const handleLogOut = async () => {
        const options = {
            method : 'GET',
            credentials : 'include',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Credentials' : true,
            }
        }

        const response = await fetch (getBaseUrl() + '/logout', options)
        const data = await response.json();
        localStorage.removeItem('user');
        window.location.href = '/login';
    }

    return ( 
        <nav className="navbar">
            <div>
                <h1>ProtoFast</h1>
                <Link to='/'><p className="navbar-button">Dashboard</p></Link>
                <Link to='/profile'><p className="navbar-button">Account</p></Link>
            </div>
            
            <div>
            {authenticated ? <p onClick={handleLogOut} className="navbar-button">Logout</p>: null }
            <p>{JSON.parse(localStorage.getItem('user')).user.userName}</p>
                
                
            </div>
        </nav>
     );
}
 
export default Navbar;