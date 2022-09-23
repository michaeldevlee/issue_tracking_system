import { useEffect, useState } from "react"

const UserList = (props) => {

    const [newCollaborator, setNewCollaborator] = useState('');
    

    useEffect(()=>{
        if (newCollaborator != ""){
            fetch('/projects/updateProject', options)
            .then((response)=>response.json())
            .then((data)=>console.log(data))
            window.location.reload(false)
        }
    },[newCollaborator])
    
    const options = {
        method : 'PUT',
        body : JSON.stringify({
          new_collaborator : newCollaborator,
          projectName : props.currentProjectViewed.projectName,
          action : 'ADD',  
        }),
        headers : {
            'Content-Type' : 'application/json'
        }
    }

    const handleAdd = async (e , userName)=>{
        const collaborator = userName;

        e.preventDefault();
        e.target.disabled = true;
        e.target.innerHTML = 'Joined';
        setNewCollaborator(collaborator);

    }

    return ( <div>
        {props.users.map((user)=>{
        return (
        <div key={user.userName}>
            <p>{user.userName}</p>
            {!props.currentProjectViewed.collaborators.includes(user.userName) ? 
            <button onClick={(e)=>{
                handleAdd(e, user.userName)
            }}>Add</button>:
            <button disabled={true}>Joined</button>}
            
        </div>
        
        )
        
        
        })}
    </div> );
}
 
export default UserList;