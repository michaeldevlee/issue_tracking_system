import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CurrentProjects from "./CurrentProjects";

const TestFunction = ()=>{

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [projectName , setprojectName] = useState('');
    const [projects , setProjects] = useState([]);
    const [color, setColor] = useState('');
    const author = JSON.parse(localStorage.getItem('user')).user.userName

    const handleSubmit = async (evt)=>{
        
        evt.preventDefault();
        const options ={
            method: "POST",
            body:JSON.stringify({
                name: name,
                description: description,
                project : projectName,
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

    useEffect(()=>{
        const options = {
            method : 'POST',
            body: JSON.stringify({projectName : 'test-project'}),
            headers : {
                'Content-Type' : 'application/json',
            }
        }

        fetch ('/issues/getProjects', options)
        .then((res)=> res.json())
        .then((data) => {
            setProjects(data.user)
        })

    },[])

    const changeDropDown = (e) =>{
        console.log(e.target.value)
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
                    <select 
                    required type="select" 
                    name="project-name" 
                    id="project-name"
                    onClick={(e)=>changeDropDown(e)}>
                        {projects ? projects.map((project)=>{
                            <div>{project}</div>
                        }):null}
                        <option onChange={(e)=>{console.log(e)}} value="add">Add New Project</option>
                        <option onClick={(e)=>{console.log('new one')}} value=""></option>
                        </select>
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