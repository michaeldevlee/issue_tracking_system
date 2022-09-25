import { useState } from "react";
import { useEffect } from "react";
import { Router, Routes, Switch } from "react-router-dom";
import AddIssueButton from "./AddIssueButton/AddIssueButton";
import IssueViewBox from "./IssueViewBox/IssueViewBox";
import IssueViewModal from "./IssueViewModal/IssueViewModal";


const IssueView = (props) => {
    const [filter , setFilter] = useState('Created');
    const [viewBoxStatus , setViewBoxStatus] = useState(false);
    const [currentIssue, setCurrentIssue] = useState(null);

    const showFilteredIssues = (filterParams)=>{
        setFilter(filterParams)
    }

    const onIssueClick = (issue)=>{
        if(localStorage.getItem('user')){
            setViewBoxStatus(!viewBoxStatus)
            setCurrentIssue(issue)
        }
    }

    return ( <div id="issue-window" className="issue-window-item">
        <div id="issue-window-top-section">
            <AddIssueButton projects={props.projects}/>
            </div>

            <div>
                <hr className="rounded" />
            </div>
        <div>

            <div id="issue-window-mid-section">
                <div id="issue-window-project-name">
                    <h2>Project Name</h2>
                    <p>{props.currentProjectViewed ? props.currentProjectViewed.projectName : null}</p>
                </div>
                <div id="issue-window-project-description">
                    <h2>Description</h2>
                    <p>{props.currentProjectViewed.description}</p>
                </div>
                <div className="filter-button-container">
                    <button className="filter-button" onClick={()=>{showFilteredIssues('Created')}}>Created</button>
                    <button className="filter-button" onClick={()=>{showFilteredIssues('Under Review')}}>Under Review</button>
                    <button className="filter-button" onClick={()=>{showFilteredIssues('Completed')}}>Completed</button>
                </div>
                    <IssueViewBox
                    currentProjectViewed={props.currentProjectViewed}
                    toggleViewBoxStatus={onIssueClick}
                    setCurrentIssue={setCurrentIssue}
                    />
                </div>
                <IssueViewModal
                viewBoxStatus={viewBoxStatus}
                toggleViewBoxStatus={onIssueClick}
                currentIssue={currentIssue} />
            </div>
            
 
    </div> );
}
 
export default IssueView;