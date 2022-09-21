import { useState } from "react";
import { useEffect } from "react";
import { Router, Routes, Switch } from "react-router-dom";
import AddIssueButton from "./AddIssueButton/AddIssueButton";
import IssueViewBox from "./IssueViewBox/IssueViewBox";


const IssueView = (props) => {
    const [rowsData, setRowsData] = useState([]);
    const [filter , setFilter] = useState('Created');
    const [issueDescription, setIssueDescription] = useState('hello')
    const [issues , setIssues] = useState([]);
    const [projectName , setprojectName] = useState("");



    const showFilteredIssues = (filterParams)=>{
        setFilter(filterParams)

    }

    const setProject = (e)=>{
        const selection = e.target.options[e.target.selectedIndex].value
        setprojectName(selection);
        setFilter('Created')
        
    }
    
    useEffect(()=>{
    },[])


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
            <div id="issue-view-grid">
                <div>
                    <h4>Title</h4>
                    <h4>Status</h4>
                    <h4>Author</h4>
                    <h4>Created At</h4>
                </div>
                <IssueViewBox currentProjectViewed={props.currentProjectViewed}/>
            </div>
        </div>
 
    </div> );
}
 
export default IssueView;