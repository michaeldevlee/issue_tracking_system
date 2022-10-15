const IssueEditModal = (props) => {
    
    console.log(props)

    const handleClose = (e)=>{
        if(e.target.classList.contains('modal-overlay') || e.target.classList.contains('exit-modal-button')){
            props.setEditModalStatus(false)
        }
    }
    if(props.editModalStatus && props.currentIssue){
        return ( <div className="modal-overlay" onClick={(e)=>handleClose(e)}>
        <div className="modal">
            <form action="">
                <h1>Edit Issue</h1>
                <label>Title</label>
                <input value={props.currentIssue.title} />
                <label>Description</label>
                <input value={props.currentIssue.description} />
                <label>Color</label>
                <input value={props.currentIssue.color} />
            </form>
        </div>
    </div> );
    }




}
 
export default IssueEditModal;