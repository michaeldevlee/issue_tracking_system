import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Projects from "../Project/Projects";

const TestFunction = ()=>{

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [projectName , setprojectName] = useState('');
    const [newProjectName , setNewProjectName] = useState('');
    const [projectExists , setProjectExists] = useState(false);
    const [issues , setIssues] = useState([]);
    const [color, setColor] = useState('');
    const author = JSON.parse(localStorage.getItem('user')).user.userName

    const getIssues = async () => {
        const options = {
            method : 'GET',
            headers : {
                'Content-Type':'application/json',
            }
        }

        const response = await fetch ('/issues/getIssues', options);
        const data = await response.json();
        setIssues(data.user)
    }

    useEffect(()=>{
        getIssues();
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

    const showProjectOptions = (projects)=>{
        let hash = {};
        const projectChoices = Object.keys(projects).map((project)=>{
            if (hash[project] == null){
                hash[project] = true;
                return <option value={project} key={project._id}>{project}</option>;
            }
        })

        return projectChoices;
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
                        {<Projects projects={issues}/>}
                        
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