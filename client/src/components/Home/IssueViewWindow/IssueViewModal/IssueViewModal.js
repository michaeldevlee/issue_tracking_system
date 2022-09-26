const IssueViewModal = (props) => {

    const handleClose = (e)=>{
        if(e.target.classList.contains('modal-overlay') || e.target.classList.contains('exit-modal-button')){
            props.toggleViewBoxStatus(false)
        }
    }

    const handleDelete = async (id)=>{
        const options ={
            method : 'PUT',
            body : JSON.stringify({
                action : 'DELETE',
                project_id : props.currentProject._id,
                issue_identifier : id,
            }),
            headers : {
                'Content-Type' : 'application/json',
            }
        }

        const response = await fetch('projects/updateProject', options);
        const data = await response.json();
        console.log(data)
        window.location.reload(false)

    }

    if (props.viewBoxStatus && props.currentIssue){
        return ( 
            <div className="modal-overlay" onClick={(e)=>handleClose(e)}>
                
                <div id={props.currentIssue.id} className="modal">
                <button onClick={(e)=>handleClose(e)} className="exit-modal-button">X</button>
                    <h1>{props.currentIssue.title}</h1>
                    <h2>Description</h2>
                    <p>{props.currentIssue.description}</p>
                    <div>
                        <button>Edit</button>
                        <button onClick={()=>handleDelete(props.currentIssue.id)}>Delete</button>
                    </div>
                </div>
            </div>
        );
    }
    
}
 
export default IssueViewModal;