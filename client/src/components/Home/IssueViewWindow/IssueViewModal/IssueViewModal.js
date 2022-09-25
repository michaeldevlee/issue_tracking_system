const IssueViewModal = (props) => {

    const handleClose = (e)=>{
        if(e.target.classList.contains('modal-overlay') || e.target.classList.contains('exit-modal-button')){
            props.toggleViewBoxStatus(false)
        }
    }

    if (props.viewBoxStatus && props.currentIssue){
        return ( 
            <div className="modal-overlay" onClick={(e)=>handleClose(e)}>
                
                <div className="modal">
                <button onClick={(e)=>handleClose(e)} className="exit-modal-button">X</button>
                    <h1>{props.currentIssue.title}</h1>
                    <h2>Description</h2>
                    <p>{props.currentIssue.description}</p>
                    <h2>Color</h2>
                    <p>{props.currentIssue.color}</p>
                </div>
            </div>
        );
    }
    
}
 
export default IssueViewModal;