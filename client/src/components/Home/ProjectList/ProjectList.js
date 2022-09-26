const ProjectList = (props) => {

    let hash = {};

    if (props.projects.length > 0){
        return ( <div className="project-list">
            <div className="search-bar">
                <button>+</button>
                <input  type="text" />
            </div>
        {props.projects.map((project)=>{
            if (hash[project.projectName] == null){
                hash[project.projectName] = true;

                if (project.author == JSON.parse(localStorage.getItem('user')).user.userName){
                    return <div key={project._id} className="project-tab" onClick={()=>{props.setCurrent(project)}} >
                    <p
                    className="project-link"
                    key={project.projectName}>
                        {project.projectName}
                        </p>
                        <p className="project-options"
                        onClick={()=>{
                            props.setInviteUserModalStatus(true)
                            props.setCurrent(project)
                            }} >+</p>
                    </div> 
                }
                else{
                    return <div key={project._id} className="project-tab" onClick={()=>{props.setCurrent(project)}} >
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