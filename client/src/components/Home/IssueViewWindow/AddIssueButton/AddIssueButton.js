import { useState } from "react";
import AddIssueModal from "./AddIssueModal";

const AddIssueButton = (props) => {

    const [status , setStatus] = useState(false);

    const handleClick = (e)=>{
        if (localStorage.getItem('user')){
            setStatus(!status)
        }
    }

    return ( <div id="add-issue-button">
        <h2>Your Issue Tracker</h2>
        <button onClick={()=>handleClick()}>Add Issue</button>
        <AddIssueModal projects={props.projects} setStatus={setStatus} status={status}/>
    </div> );
}
 
export default AddIssueButton;