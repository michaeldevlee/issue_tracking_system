const ProjectList = (props) => {
    let hash = {};

    if (props.projects.length > 0){
        return ( <div className="project-list">
        <h1>Project List</h1>
        {props.projects.map((project)=>{
            if (hash[project.projectName] == null){
                hash[project.projectName] = true;
                return <button onClick={()=>{props.setCurrent(project)}} key={project.projectName}>{project.projectName}</button> 
            }}
        )}
    </div> );
    }
    else{
        return null;
    }


}
 
export default ProjectList;