import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import InviteUserModal from "./InviteUserModal/InviteUserModal";
import IssueWindow from "./IssueViewWindow/IssueWindow";
import ProjectList from "./ProjectList/ProjectList";
import getBaseUrl from "../../utils/getBaseUrl";

const Home = () => {
    const [userName, setUserName] = useState('');
    const [projects, setProjects] = useState('');
    const [roles, setRoles] = useState('');
    const [currentProjectViewed, setCurrentProjectViewed] = useState('');
    const [inviteUserModalStatus , setInviteUserModalStatus] = useState(false);
    const navigate = useNavigate();

    const getProjects = async () => {
        console.log('getting projects')
        const options = {
            method : 'GET',
            credentials: 'include',
            withCredentials : true,
            headers : {
                'Accept': 'application/json',
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Credentials': true
            },

        }

        const response = await fetch (getBaseUrl() +'/projects/getProjects', options);
        const data = await response.json();
        setProjects(data.projects)
        console.log(data.projects)
    }

    const getRole = async ()=>{
        const options = {
            method : 'POST',
            body : JSON.stringify({
                project_id : currentProjectViewed._id,
            }),
            credentials: 'include',
            headers : {
                'Accept': 'application/json',
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Credentials': true
            },

        }

        const response = await fetch (getBaseUrl() +'/roles/getRole', options);
        const data = await response.json();
        setRoles(data.role)
        console.log('getting role')
    }


    useEffect(()=>{
        const user = localStorage.getItem('user')
        if (user && document.cookie){
            setUserName(JSON.parse(user).user.userName)
            getProjects();
            getRole();
        }
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