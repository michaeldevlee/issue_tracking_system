const Projects = (props) => {
    let projectCategories = [];
    let hash = {}

    {for (let i = 0 ; i < props.projects.length ; i++){
        let name = props.projects[i].projectName;
        if (!hash[name]){
            hash[name] = true;
            projectCategories.push(<option key={props.projects[i]._id} >{name}</option>);

        }
    }}

    return (projectCategories);

}
export default Projects;