const Navbar = () => {
    return ( 
        <nav className="navbar">
            <div>
                <button className="navbar-button">Home</button>
                <button className="navbar-button">Account</button>
                <button className="navbar-button">Add Issue</button>
            </div>
            <div>
                <button className="navbar-button">Logout</button>
            </div>
        </nav>
     );
}
 
export default Navbar;