import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TestFunction = ()=>{

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [projectName , setprojectName] = useState('');
    const [newProjectName , setNewProjectName] = useState('');
    const [projectExists , setProjectExists] = useState(false);
    const [projects , setProjects] = useState([]);
    const [color, setColor] = useState('');
    const author = JSON.parse(localStorage.getItem('user')).user.userName

    const getProjects = async () => {
        const options = {
            method : 'GET',
            headers : {
                'Content-Type':'application/json',
            }
        }

        const response = await fetch ('/users/getUser', options);
        const data = await response.json();
        setProjects(data.user[0].projects)
        console.log(data.user[0].projects);
    }

    useEffect(()=>{
        getProjects();
},[])



    const handleSubmit = async (evt)=>{
        
        evt.preventDefault();
        const options ={
            method: "POST",
            body:JSON.stringify({
                name: name,
                description: description,
                projectName : projectExists ? projectName : newProjectName,
                projects : 1,
                author : author,
                color: color,
            }),
            headers:{
                'Content-Type' : 'application/json'
            }
        }

        const response = await fetch('/issues/createIssue', options );
        const data = await response.json();
        navigate('/',{replace : true})


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


    return(
        <div>
            <h1>Create Issue</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name of Issue</label>
                    <input 
                    required type="text" 
                    name="issue-name" 
                    id="issue-name"
                    onChange={(e)=>setName(e.target.value)} />
                </div>
                <div>
                    <label>Description</label>
                    <textarea 
                    required type="text" 
                    name="issue-description" 
                    id="issue-description" 
                    onChange={(e)=>{setDescription(e.target.value)}}>
                    </textarea>
                <div>
                    <label>Project</label>
                    
                    <select onChange={setProject} name="" id="">
                        <option > </option>
                        <option  value="Add New Project">Add New Project</option>
                        {projects ? Object.keys(projects).map ((project)=> <option value={project} key={project._id}>{project}</option>):null}
                        
                    </select>
                    <div>{projectName === "Add New Project" ? <div>Project Name<input onChange={(e)=>{setNewProjectName(e.target.value)}}/></div> : null}</div>
                </div>
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
                </div>
                <div>
                    <button type="submit" >Close</button>
                    <button type="" >Clear</button>
                </div>
            </form>
        </div>
    );
}



export default TestFunction;