import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import AddIssueButton from "./IssueViewWindow/AddIssueButton/AddIssueButton";
import IssueWindow from "./IssueViewWindow/IssueWindow"
import ProjectList from "./ProjectList/ProjectList";

const Home = () => {
    const [userName, setUserName] = useState('');
    const [projects, setProjects] = useState('');
    const [currentProjectViewed, setCurrentProjectViewed] = useState('');
    const navigate = useNavigate();

    const getProjects = async () => {
        const options = {
            method : 'GET',
            headers : {
                'Content-Type':'application/json',
            }
        }

        const response = await fetch ('/projects/getProjects', options);
        const data = await response.json();
        setProjects(data.projects)
        console.log(data.projects)
    }


    useEffect(()=>{
        const user = localStorage.getItem('user')
        if (user){
            setUserName(JSON.parse(user).user.userName)
        }
        else{
            localStorage.clear('user');
            navigate('/login')
        }
        getProjects();
        
    },[])

    return (
    <div className="home">
        <Navbar />
        <ProjectList projects={projects} setCurrent={setCurrentProjectViewed}/>
        <IssueWindow projects={projects} currentProjectViewed={currentProjectViewed}/>
    </div>  
    )
}
 
export default Home;