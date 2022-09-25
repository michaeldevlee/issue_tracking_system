const IssueViewBox = (props) => {

    return ( 
    <div className="issue-view-item">
        <div className="issue-view-legend-row">
            <h4>Title</h4>
            <h4>Status</h4>
            <h4>Author</h4>
            <h4>Created At</h4>
        </div>
        <div>
            {props.currentProjectViewed ? props.currentProjectViewed.issues.map((issue)=>{
                return <div onClick={()=>props.toggleViewBoxStatus(issue)} key={issue.createdAt}>

                    <div className="issue-view-row">
                        <p>{issue.title}</p>
                        <p>{issue.status}</p>
                        <p>{issue.author}</p>
                        <p>{issue.createdAt}</p>
                    </div>
                    </div>
            }) : null}
            </div>
        </div> );
}
 
export default IssueViewBox;