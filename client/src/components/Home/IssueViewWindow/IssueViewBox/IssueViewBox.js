const IssueViewBox = (props) => {
    return ( 
    <div>
        <div>
            {props.currentProjectViewed ? props.currentProjectViewed.issues.map((issue)=>{
                return <a href="" key={issue.createdAt}>
                    <div>
                        <p>{issue.title}</p>
                    </div>
                    <div>
                        <p>{issue.description}</p>
                    </div>
                    
                    </a>
            }) : null}
            </div>
        </div> );
}
 
export default IssueViewBox;