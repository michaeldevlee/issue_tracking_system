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

    const currentAuthor = JSON.parse(localStorage.getItem('user')).user.userName;
    const author = props.currentProjectViewed.author

    console.log(author)

    const showFilteredIssues = (filterParams)=>{
        setFilter(filterParams)
    }

    const onIssueClick = (issue)=>{
        if(localStorage.getItem('user')){
            setViewBoxStatus(!viewBoxStatus)
            setCurrentIssue(issue)
        }
    }

    const handleDelete = async ()=>{
        const options = {
            method : 'DELETE',
            body : JSON.stringify({
                id : props.currentProjectViewed._id
            }),
            headers : {
                'Content-Type' : 'application/json'
            }
        }

        const response = await fetch('projects/deleteProject', options)
        const data = await response.json();
        console.log(data)
        window.location.reload(false)
    }

    const handleLeaveProject = async ()=>{
        const options = {
            method : 'PUT',
            body : JSON.stringify({
                new_collaborator : currentAuthor,
                project_id : props.currentProjectViewed._id,
                action : 'DELETE',
            }),
            headers : {
                'Content-Type' : 'application/json'
            }
        }

        const response = await fetch('projects/updateProject', options)
        const data = await response.json();
        console.log(data)
        window.location.reload(false)
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

                <div>
                    <hr className="rounded" />
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
                currentIssue={currentIssue}
                currentProject={props.currentProjectViewed}
                />

                <div>
                    {currentAuthor == author ? <button onClick={()=>handleDelete()}> Delete Project</button> : null}
                    {currentAuthor != author && props.currentProjectViewed ? <button onClick={()=>handleLeaveProject()}> Leave Project</button> : null}
                </div>

            </div>
            
 
    </div> );
}
 
export default IssueView;