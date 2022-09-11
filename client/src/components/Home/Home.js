import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const [userName, setUserName] = useState('some name');
    const [authenticated , setAuthenticated] = useState(null);

    const handleSubmit = async (e)=> {
        setUserName('Michael')
    }

    return (
    <div className="home">
        <p>Welcome {userName}</p>
        <p>Dashboard</p>
        <button onClick={handleSubmit} >Get user info</button>
    </div>  
    )
}
 
export default Home;