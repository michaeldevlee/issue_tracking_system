import { useState } from "react";
import { useEffect } from "react";
import TableRow from "./IssueRow";

const IssueView = () => {
    const [rowsData, setRowsData] = useState([]);
    const [filter , setFilter] = useState(false);
    const [issueDescription, setIssueDescription] = useState('hello')
    const [projects , setProjects] = useState([]);
    const [projectName , setprojectName] = useState('');

    const getProjects = async () => {
        const options = {
            method : 'GET',
            headers : {
                'Content-Type':'application/json',
            }
        }

        const response = await fetch ('/issues/getIssues', options);
        const data = await response.json();
        setProjects(data.user)
        console.log(data);
    }
    

    const addTableRows = async () => {
        const options = {
            method : 'GET',
            headers : {
                'Content-Type':'application/json',
            }
        }

        const response = await fetch ('/issues/getIssues', options);
        const data = await response.json();
        setRowsData(data.user)
        console.log(data);
    }

    const showFilteredIssues = (filterParams)=>{
        setFilter(filterParams)
        console.log(filterParams)
    }

    const setProject = (e)=>{
        const selection = e.target.options[e.target.selectedIndex].value
        setprojectName(selection);
        setFilter(selection)
    }

    useEffect(()=>{
        addTableRows();
        getProjects();
    },[])


    return ( <div>

        <button onClick={()=>{showFilteredIssues('Created')}}>Created</button>
        <button onClick={()=>{showFilteredIssues('Under Review')}}>Under Review</button>
        <button onClick={()=>{showFilteredIssues('Completed')}}>Completed</button>   
        <select onChange={setProject} name="" id="">
                        {projects ? projects.map((project)=>{
                            return <option value={project.projectName} key={project._id}>{project.projectName}</option>
                        }): null}
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
                    {filter && projectName ? <TableRow rowsData={rowsData.filter((issue)=>{
                        console.log(issue.projectName)
            return issue.status === filter && issue.projectName === projectName})}/> : <TableRow rowsData={rowsData} setIssueDesc = {setIssueDescription}/>}
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