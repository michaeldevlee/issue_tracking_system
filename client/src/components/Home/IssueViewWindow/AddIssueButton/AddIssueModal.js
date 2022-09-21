import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Projects from "../../../Project/Projects";

const AddIssueModal = (props) => {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [projectName , setprojectName] = useState('');
    const [projects , setProjects] = useState('');
    const [newProjectName , setNewProjectName] = useState('');
    const [projectExists , setProjectExists] = useState(false);
    const [action , setAction ] = useState("ADD");
    const [issues , setIssues] = useState([]);
    const [color, setColor] = useState('');
    const author = JSON.parse(localStorage.getItem('user')).user.userName

    const handleClose = (e)=>{
        if(e.target.classList.contains('modal-overlay')){
            props.setStatus(false)
        }
    }

    const handleSubmit = async (evt)=>{
        
        evt.preventDefault();
        const create_options ={
            method: "POST",
            body:JSON.stringify({
                name: name,
                description: description,
                projectName : projectExists ? projectName : newProjectName,
                author : author,
                color: color,
                new_issue : projectExists,
                action : action,
            }),
            headers:{
                'Content-Type' : 'application/json'
            }

            
        }

        const update_options ={
            method: "PUT",
            body:JSON.stringify({
                name: name,
                description: description,
                projectName : projectExists ? projectName : newProjectName,
                author : author,
                color: color,
                new_issue : projectExists,
                action : action,
            }),
            headers:{
                'Content-Type' : 'application/json'
            }
        }
        if(projectExists){
            const response = await fetch('/projects/updateProject', update_options );
            const data = await response.json();
            setAction("ADD")
            console.log(data)
            navigate('/',{replace : true})
        }
        else{
            const response = await fetch('/projects/createProject', create_options );
            const data = await response.json();
            setAction("NOTHING")
            console.log(data)
            navigate('/',{replace : true})
        }

    }

    const setProject = (e)=>{
        const selection = e.target.options[e.target.selectedIndex].value
        setprojectName(selection);

        if (selection === "Add New Project"){
            setProjectExists(false);
        }
        else{
            setProjectExists(true);
        }
        
    }

    if (props.status == true){
        return ( <div className="modal-overlay" onClick={(e)=>handleClose(e)}>
            <div id="add-issue-modal"  className="modal">
                <h1>Add Issue</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Title</label>
                        <input 
                        required type="text" 
                        name="issue-name" 
                        id="issue-name"
                        onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div>
                        <label>Description</label>
                        <input                     
                        required type="text" 
                        name="issue-description" 
                        id="issue-description" 
                        onChange={(e)=>{setDescription(e.target.value)}}
                        />
                    </div>
                    <div>
                        <label>Project</label>
                        <select onChange={(e)=>setProject(e)} required name="" id="">
                            <option > </option>
                            <option  value="Add New Project">Add New Project</option>
                            <Projects projects={props.projects}/>
                        </select>
                        <div>{projectName === "Add New Project" ? <div>Project Name<input onChange={(e)=>{setNewProjectName(e.target.value)}}/></div> : null}</div>
                    </div>
                    <div>
                        <label>Color</label>
                        <div>
                            <input 
                            onChange={(e)=>{setColor(e.target.value)}}
                            value="red"
                            name="color-result"
                            id="red-color"
                            type="radio" />
                            <input
                            onInput={(e)=>{setColor(e.target.value)}}
                            value="blue"
                            name="color-result"
                            id="blue-color"
                            type="radio" />
                            <input
                            onInput={(e)=>{setColor(e.target.value)}}
                            value="green"
                            name="color-result"
                            id="green-color"
                            type="radio" />
                            <input
                            onInput={(e)=>{setColor(e.target.value)}}
                            value="yellow"
                            name="color-result"
                            id="yellow-color"
                            type="radio" />
                        </div>
                        <div>
                    <button type="submit" >Close</button>
                    <button type="" >Clear</button>
                        </div>
                    </div>
                    
                </form>

                
            </div>
        </div> );
    }
    else{
        return null;
    }


}
 
export default AddIssueModal;