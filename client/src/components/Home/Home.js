import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import InviteUserModal from "./InviteUserModal/InviteUserModal";
import IssueWindow from "./IssueViewWindow/IssueWindow"
import ProjectList from "./ProjectList/ProjectList";
import getBaseUrl from "../../utils/getBaseUrl";

const Home = () => {
    const [userName, setUserName] = useState('');
    const [projects, setProjects] = useState('');
    const [currentProjectViewed, setCurrentProjectViewed] = useState('');
    const [inviteUserModalStatus , setInviteUserModalStatus] = useState(false);
    const navigate = useNavigate();

    const getProjects = async () => {
        const options = {
            method : 'GET',
            headers : {
                'Content-Type':'application/json',
            }
        }

        const response = await fetch (getBaseUrl() +'/projects/getProjects', options);
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
        <div className="fixed-area">
            <Navbar />
            <ProjectList setInviteUserModalStatus={setInviteUserModalStatus} projects={projects} setCurrent={setCurrentProjectViewed}/>
        </div>
        <div className="home-placeholder">

        </div>
        <IssueWindow projects={projects} currentProjectViewed={currentProjectViewed}/>
        <InviteUserModal currentProjectViewed={currentProjectViewed} setInviteUserModalStatus={setInviteUserModalStatus} inviteUserModalStatus={inviteUserModalStatus}/>
    </div>  
    )
}
 
export default Home;