import Navbar from "../Navbar/Navbar";

const Account = (props) => {

    if (props.projects){
        let approved = 0;
        let created = 0;
        let underReview = 0;

        props.projects.forEach((project)=>{
            project.issues.forEach((issue)=>{
                if(issue.status == "Approved"){
                    approved++;
                }
                else if (issue.status == "Created"){
                    created++;
                }
                else if (issue.status == "Under Review"){
                    underReview++;
                }
            })
        })
        
        return(
            <div className="home">
                <div className="fixed-area"><Navbar/></div>
                <div className="home-placeholder"></div>
                <div id="issue-window">
                    <h1>Account Overview</h1>
                    <p>{JSON.parse(localStorage.getItem('user')).user.userName}</p>
                    <h3>Project Count</h3>
                    <p>{props.projects.length}</p>
                    <h3>Issues Completed</h3>
                    <p>{approved}</p>
                    <h3>Issues Under Review</h3>
                    <p>{underReview}</p>
                </div>
            </div>
        )
    }

}
 
export default Account;