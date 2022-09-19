import { useState } from "react";
import { useEffect } from "react";
import AddIssueButton from "./AddIssueButton/AddIssueButton";
import Projects from "../../Project/Projects";
import TableRow from "../IssueViewWindow/IssueRow";


const IssueView = (props) => {
    const [rowsData, setRowsData] = useState([]);
    const [filter , setFilter] = useState('Created');
    const [issueDescription, setIssueDescription] = useState('hello')
    const [issues , setIssues] = useState([]);
    const [projectName , setprojectName] = useState("");

    const getIssues = async () => {
        const options = {
            method : 'GET',
            headers : {
                'Content-Type':'application/json',
            }
        }

        const response = await fetch ('/issues/getIssues', options);
        const data = await response.json();
        setIssues(data.user)
    }
    

    const showFilteredIssues = (filterParams)=>{
        setFilter(filterParams)

    }

    const setProject = (e)=>{
        const selection = e.target.options[e.target.selectedIndex].value
        setprojectName(selection);
        setFilter('Created')
        
    }
    
    useEffect(()=>{
        getIssues();
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
                <h2>Project</h2>
            </div>
            <div>
                <h2>Description</h2>
            </div>
        </div>
 
    </div> );
}
 
export default IssueView;