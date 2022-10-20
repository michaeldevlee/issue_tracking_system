import { useState } from "react";
import getBaseUrl from "../../../../utils/getBaseUrl";
import IssueEditModal from "./IssueEditModal";

const IssueViewModal = (props) => {

    const [approvalStatus , setApprovalStatus] = useState('Ready For Review')

    const openEditPage = ()=>{

        props.setEditModalStatus(true);
    }

    const handleClose = (e)=>{
        if(e.target.classList.contains('modal-overlay') || e.target.classList.contains('exit-modal-button')){
            props.toggleViewBoxStatus(false)
        }
    }

    const handleDelete = async (id)=>{
        const options ={
            method : 'PUT',
            credentials : 'include',
            body : JSON.stringify({
                action : 'DELETE',
                project_id : props.currentProject._id,
                issue_identifier : id,
            }),
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Credentials' : true,
            }
        }


        const response = await fetch( getBaseUrl() + '/projects/updateProject', options);
        const data = await response.json();
        window.location.reload('false')


    }
    
    const handleReview = async ()=>{
        props.setReviewModalStatus(true);
    }

    const handleReviewSubmit = async (e)=>{
        e.preventDefault();

        const options ={
            method : 'PUT',
            credentials : 'include',
            body : JSON.stringify({
                action: "REVIEW",
                project_id : props.currentProject._id,
                new_issue : props.currentIssue,
                new_review_action: approvalStatus,
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
    

    const handleEdit = async ()=>{
        const options ={
            method : 'PUT',
            credentials : 'include',
            body : JSON.stringify({
                action: "EDIT",
                new_issue : props.currentIssue,
            }),
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Credentials' : true,
            }
        }
        openEditPage();
        
    }

    if (props.viewBoxStatus){
        return ( 
            <div className="modal-overlay" onClick={(e)=>handleClose(e)}>
                
                <div id={props.currentIssue.id} className="modal">
                <button onClick={(e)=>handleClose(e)} className="exit-modal-button">X</button>
                    <h1>{props.currentIssue.title}</h1>
                    <h2>Description</h2>
                    <p>{props.currentIssue.description}</p>
                    <div>
                        <button onClick={()=>handleEdit()}>Edit</button>
                        <button onClick={()=>handleDelete(props.currentIssue.id)}>Delete</button>
                        {(props.currentProject.author == JSON.parse(localStorage.getItem('user')).user.userName)
                        && ((props.currentIssue.status == "Ready For Review"||
                        props.currentIssue.status == "Under Review")) 
                         ? <button onClick={()=>handleReview()}>Review</button> : null}
                         {(props.currentIssue.status != "Ready For Review") &&
                        (props.currentIssue.status != "Approved") &&
                        (props.currentIssue.status != "Under Review")
                         ? <button onClick={(e)=>handleReviewSubmit(e)}>Submit For Review</button> : null}
                    </div>
                </div>
            </div>
        );
    }

}
 
export default IssueViewModal;