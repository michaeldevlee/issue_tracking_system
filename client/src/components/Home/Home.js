import React from "react";
import { useEffect, useState } from "react";
import IssueWindow from "./IssueWindow";

const Home = () => {
    const [userName, setUserName] = useState('');
    const [projects, setProjects] = useState('');

    const getProjects = async () => {
        const options = {
            method : 'GET',
            headers : {
                'Content-Type':'application/json',
            }
        }

        const response = await fetch ('/users/getUser', options);
        const data = await response.json();
        setProjects(data.user[0].projects)
    }


    useEffect(()=>{
        const user = localStorage.getItem('user')
        if (user){
            setUserName(JSON.parse(user).user.userName)
        }
        else{
            localStorage.clear('user');
        }

        getProjects();
        
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