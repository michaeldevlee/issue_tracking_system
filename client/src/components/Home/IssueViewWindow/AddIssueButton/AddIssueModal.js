import { useState } from "react";
import { useNavigate } from "react-router-dom";
import getBaseUrl from "../../../../utils/getBaseUrl";
import Projects from "../../../Project/Projects";

const AddIssueModal = (props) => {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [projectName , setprojectName] = useState('');
    const [projectId , setProjectId] = useState('');
    const [newProjectName , setNewProjectName] = useState('');
    const [projectExists , setProjectExists] = useState(false);
    const [action , setAction ] = useState("ADD");
    const [color, setColor] = useState('FF0069');
    const author = JSON.parse(localStorage.getItem('user')).user.userName

    const handleClose = (e)=>{
        if(e.target.classList.contains('modal-overlay') || e.target.classList.contains('exit-modal-button')){
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
                project_id: projectId,
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
                project_id: projectId,
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
            const response = await fetch( getBaseUrl() + '/projects/updateProject', update_options );
            const data = await response.json();
            setAction("ADD")
            console.log(data)
            window.location.reload(false);
        }
        else{
            const response = await fetch(getBaseUrl() + '/projects/createProject', create_options );
            const data = await response.json();
            setAction("NOTHING")
            console.log(data)
            window.location.reload(false);
        }

    }

    const setProject = (e)=>{
        const selection = e.target.options[e.target.selectedIndex].value
        setprojectName(selection);
        setProjectId(e.target.options[e.target.selectedIndex].id)

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
                <button onClick={(e)=>handleClose(e)} className="exit-modal-button">X</button>
                <div className="add-issue-modal-container"> 
                    <h1>Add Issue</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Title</label>
                            <input
                            className="text-field"
                            required type="text"
                            name="issue-name"
                            id="issue-name"
                            onChange={(e)=>setName(e.target.value)}/>
                        </div>
                        <div>
                            <label>Description</label>
                            <textarea
                            className="text-field"
                            required type="text"
                            name="issue-description"
                            id="issue-description"
                            maxLength={"150"}
                            rows="5"
                            onChange={(e)=>{setDescription(e.target.value)}}
                            />
                        </div>
                        <div>
                            <label>Project</label>
                            <select 
                            onChange={(e)=>setProject(e)} 
                            required
                            className="drop-down w-100 position-static"
                            >
                                <option > </option>
                                <option  value="Add New Project">Add New Project</option>
                                <Projects projects={props.projects}/>
                            </select>
                            <div>{projectName === "Add New Project" ? <div>Project Name<input onChange={(e)=>{setNewProjectName(e.target.value)}}/></div> : null}</div>
                        </div>
                        <div>
                            
                        <div className="color-picker-container">
                            <button onClick={(e)=>setColor(e.target.value)} className="color-picker" id="red-color-option" type="button" value={"FF0069"}></button>
                            <button onClick={(e)=>setColor(e.target.value)} className="color-picker" id="green-color-option" type="button" value={"4AFF86"}></button>
                            <button onClick={(e)=>setColor(e.target.value)} className="color-picker" id="blue-color-option" type="button" value={"4A78FF"}></button>
                            <button onClick={(e)=>setColor(e.target.value)} className="color-picker" id="yellow-color-option" type="button" value={"FFEF2B"}></button>
                            <button onClick={(e)=>setColor(e.target.value)} className="color-picker" id="purple-color-option" type="button" value={"D58AFE"}></button>
                            </div>
                        </div>
                        <div className="add-modal-buttons">
                        <button className="add-issue-submit-button" type="submit" >Add</button>
                        <input type={"reset"} className="add-issue-clear-button" value={'Clear'}></input>
                            </div>
                    </form>
                </div>

                
            </div>
        </div> );
    }
    else{
        return null;
    }


}
 
export default AddIssueModal;