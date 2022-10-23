const ProjectList = (props) => {

    let hash = {};

    if (props.projects.length > 0){
        return ( <div className="project-list">
            <h2>Project List</h2>

        {props.projects.map((project)=>{
            if (hash[project.projectName] == null){
                hash[project.projectName] = true;

                if (project.author == JSON.parse(localStorage.getItem('user')).user.userName){
                    return <div key={project._id} className="project-tab" onClick={()=>{props.setCurrentProjectViewed(project)}} >
                    <p
                    className="project-link"
                    key={project.projectName}>
                        {project.projectName}
                        </p>
                        <p className="project-options"
                        onClick={()=>{
                            props.setInviteUserModalStatus(true)
                            props.setCurrentProjectViewed(project)
                            }} >+</p>
                    </div> 
                }
                else{
                    return <div key={project._id} className="project-tab" onClick={()=>{props.setCurrentProjectViewed(project)}} >
                    <p 
                    className="project-link"
                    
                    key={project.projectName}>
                        {project.projectName}
                        </p>
                    </div>
                }
                
            }}
        )}
    </div> );
    }
    else{
        return null;
    }


}
 
export default ProjectList;