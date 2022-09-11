import { useState } from "react";

const TestFunction = ()=>{

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('');
    

    const handleSubmit = async (evt)=>{
        evt.preventDefault();
        const options ={
            method: "POST",
            body:JSON.stringify({
                name: name,
                description: description,
                color: color,
            }),
            headers:{
                'Content-Type' : 'application/json'
            }
        }

        const response = await fetch('/issues/createIssue', options );
        await response.json()
        

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
                </div>
                <div>
                    <label>Color</label>
                    <div>
                        <input 
                        onInput={(e)=>{setColor(e.target.value)}} 
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