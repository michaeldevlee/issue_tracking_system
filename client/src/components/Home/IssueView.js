import { useState } from "react";
import { useEffect } from "react";
import TableRow from "./IssueRow";

const IssueView = () => {
    const [rowsData, setRowsData] = useState([]);
    const [filter , setFilter] = useState(false);
    const [issueDescription, setIssueDescription] = useState('hello')

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

    const showAllIssues = () =>{
        setFilter(null)
    }

    useEffect(()=>{
        addTableRows();
    },[])


    return ( <div>

        <button onClick={showAllIssues}>All</button>
        <button onClick={()=>{showFilteredIssues('Under Review')}}>Under Review</button>
        <button onClick={()=>{showFilteredIssues('Completed')}}>Completed</button>   
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
                    {filter ? <TableRow rowsData={rowsData.filter((issue)=>{
            return issue.status == filter})}/> : <TableRow rowsData={rowsData} setIssueDesc = {setIssueDescription}/>}
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