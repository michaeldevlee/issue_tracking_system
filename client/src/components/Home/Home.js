import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import InviteUserModal from "./InviteUserModal/InviteUserModal";
import IssueWindow from "./IssueViewWindow/IssueWindow";
import ProjectList from "./ProjectList/ProjectList";
import getBaseUrl from "../../utils/getBaseUrl";

const Home = (props) => {

    return (
    <div className="home">
        <div className="fixed-area">
            <Navbar />
            <ProjectList setInviteUserModalStatus={props.setInviteUserModalStatus} projects={props.projects} setCurrentProjectViewed={props.setCurrentProjectViewed}/>
        </div>
        <div className="home-placeholder">

        </div>
        <IssueWindow projects={props.projects} currentProjectViewed={props.currentProjectViewed}/>
        <InviteUserModal currentProjectViewed={props.currentProjectViewed} setInviteUserModalStatus={props.setInviteUserModalStatus} inviteUserModalStatus={props.inviteUserModalStatus}/>
    </div>  
    )
}
 
export default Home;