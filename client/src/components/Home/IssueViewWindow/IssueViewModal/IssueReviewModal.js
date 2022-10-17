import { useState } from "react"
import getBaseUrl from "../../../../utils/getBaseUrl";

const IssueReviewModal = (props) => {

    const [approvalStatus , setApprovalStatus] = useState('disapprove')


    const handleClose = (e)=>{
        if(e.target.classList.contains('modal-overlay') || e.target.classList.contains('exit-modal-button')){
            props.setReviewModalStatus(false)
        }
    }

    const handleSubmit = async (e)=>{
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

    if(props.reviewModalStatus && props.currentIssue){
        return ( <div className="modal-overlay" onClick={(e)=>handleClose(e)}>
        <div className="modal">
        <h1>Review Issue</h1>
                <h3>Title</h3>
                <p>{props.currentIssue.title}</p>
                <p>Description</p>
                <p>{props.currentIssue.description}</p>
                <p>Color</p>
                <p>{props.currentIssue.color}</p>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <h3>Comments</h3>
                <input type="text" />

                <label htmlFor="Disapproved">Disapprove</label>
                <input 
                type="radio" 
                name="result" 
                onChange={()=>setApprovalStatus('Disapproved')}
                id="Disapproved"/>

                <label htmlFor="Under Review">Set Under Review</label>
                <input 
                type="radio" 
                name="result"
                onChange={()=>setApprovalStatus('Under Review')}
                id="Under Review"/>

                <label htmlFor="Approved">Approve</label>
                <input 
                type="radio" 
                name="result"
                onChange={()=>setApprovalStatus('Approved')}
                id="Approved"/>          



                <input type="submit" />
            </form>
        </div>
    </div> );
    }




}
 
export default IssueReviewModal;