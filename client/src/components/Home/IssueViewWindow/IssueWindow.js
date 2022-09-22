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
            

        <button onClick={()=>{showFilteredIssues('Created')}}>Created</button>
        <button onClick={()=>{showFilteredIssues('Under Review')}}>Under Review</button>
        <button onClick={()=>{showFilteredIssues('Completed')}}>Completed</button>   
        <div>

            <div>
                <h2>{props.currentProjectViewed ? props.currentProjectViewed.projectName : null}</h2>
            </div>
            <div>
                <h2>Description</h2>
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
            
 
    </div> );
}
 
export default IssueView;