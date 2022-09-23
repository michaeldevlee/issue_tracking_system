const ProjectList = (props) => {

    let hash = {};

    if (props.projects.length > 0){
        return ( <div className="project-list">
        <h1>Project List</h1>
        {props.projects.map((project)=>{
            if (hash[project.projectName] == null){
                hash[project.projectName] = true;

                if (project.author == JSON.parse(localStorage.getItem('user')).user.userName){
                    return <div key={project._id}>
                    <button 
                    onClick={()=>{props.setCurrent(project)}} 
                    key={project.projectName}>
                        {project.projectName}
                        </button>
                        <button onClick={()=>{
                            props.setInviteUserModalStatus(true)
                            props.setCurrent(project)
                            }} >+</button>
                    </div> 
                }
                else{
                    return <div key={project._id}>
                    <button 
                    onClick={()=>{props.setCurrent(project)}} 
                    key={project.projectName}>
                        {project.projectName}
                        </button>
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