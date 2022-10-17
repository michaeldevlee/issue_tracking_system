import { useState } from "react"
import getBaseUrl from "../../../../utils/getBaseUrl";

const IssueEditModal = (props) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('');

    const handleClose = (e)=>{
        if(e.target.classList.contains('modal-overlay') || e.target.classList.contains('exit-modal-button')){
            props.setEditModalStatus(false)
        }
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const options ={
            method : 'PUT',
            credentials : 'include',
            body : JSON.stringify({
                action: "EDIT",
                project_id : props.currentProject._id,
                new_issue : props.currentIssue,
                name : title != '' ? title : props.currentIssue.title,
                description : description != '' ? description : props.currentIssue.description,
                color : color != '' ? color : props.currentIssue.color,
            }),
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Credentials' : true,
                }
            }

            const response = await fetch(getBaseUrl() + '/projects/updateProject', options);
            const data = await response.json();
            window.location.reload(false);
        }

    if(props.editModalStatus && props.currentIssue){

        return ( <div className="modal-overlay" onClick={(e)=>handleClose(e)}>
        <div className="modal">
            <form onSubmit={(e)=>handleSubmit(e)}>
                <h1>Edit Issue</h1>
                <label>Title</label>
                <input defaultValue={props.currentIssue.title} onChange={(e)=>setTitle(e.target.value)}/>
                <label>Description</label>
                <input defaultValue={props.currentIssue.description} onChange={(e)=>setDescription(e.target.value)} />
                <label>Color</label>
                <input defaultValue={props.currentIssue.color} onChange={(e)=>setColor(e.target.value)} />
                <input type="submit" />
            </form>
        </div>
    </div> );
    }




}
 
export default IssueEditModal;