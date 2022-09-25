import { useState } from "react";
import AddIssueModal from "./AddIssueModal";

const AddIssueButton = (props) => {

    const [status , setStatus] = useState(false);

    const handleClick = (e)=>{
        if (localStorage.getItem('user')){
            setStatus(!status)
        }
    }

    return ( <div id="dashboard-top">
        <h2>Dashboard</h2>
        <button className="add-issue-btn" onClick={()=>handleClick()}>Add Issue</button>
        <AddIssueModal projects={props.projects} setStatus={setStatus} status={status}/>
    </div> );
}
 
export default AddIssueButton;