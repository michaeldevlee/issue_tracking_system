import React from "react";
import { useEffect, useState } from "react";
import IssueWindow from "./IssueWindow";

const Home = () => {
    const [userName, setUserName] = useState('');

    useEffect(()=>{
        const user = localStorage.getItem('user')
        if (user){
            setUserName(JSON.parse(user).user.userName)
        }
        
    },[])

    return (
    <div className="home">
        <p>Welcome {userName}</p>
        <p>Dashboard</p>
        <IssueWindow/>
    </div>  
    )
}
 
export default Home;