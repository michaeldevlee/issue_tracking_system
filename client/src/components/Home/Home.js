import React from "react";
import { useEffect, useState } from "react";
import IssueView from "./IssueView";

const Home = () => {
    const [userName, setUserName] = useState('');

    useEffect(()=>{
        setUserName('Michael')
    },[])
    


    return (
    <div className="home">
        <p>Welcome {userName}</p>
        <p>Dashboard</p>
        <IssueView/>
    </div>  
    )
}
 
export default Home;