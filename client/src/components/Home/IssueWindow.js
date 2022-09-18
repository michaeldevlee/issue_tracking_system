import { useState } from "react";
import { useEffect } from "react";
import Projects from "../Project/Projects";
import TableRow from "./IssueRow";

const IssueView = () => {
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
    

    const addTableRows = async () => {
        const options = {
            method : 'POST',
            body: JSON.stringify({projectName:'rrt'}),
            headers : {
                'Content-Type':'application/json',
            }
        }


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
        addTableRows();
        getIssues();
    },[])


    return ( <div>

        <button onClick={()=>{showFilteredIssues('Created')}}>Created</button>
        <button onClick={()=>{showFilteredIssues('Under Review')}}>Under Review</button>
        <button onClick={()=>{showFilteredIssues('Completed')}}>Completed</button>   
        <select onChange={setProject} name="" id="">
                        <option value=""></option>
                        <Projects projects={issues} />
                    </select>
        <div>
            <table>
                <tbody>
                    <tr id="header-row">
                        <td>
                        </td>
                        <td>
                            Issue Name
                        </td>
                        <td>
                            Description
                        </td>
                        <td>
                            Status
                        </td>
                        <td>
                            Reviewer
                        </td>
                        <td>
                            Comments
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
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