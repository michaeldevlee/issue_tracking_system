import { useEffect, useState } from "react"
import getBaseUrl from "../../../../utils/getBaseUrl";

const UserList = (props) => {

    const [newCollaborator, setNewCollaborator] = useState('');
    

    useEffect(()=>{
        if (newCollaborator != ""){
            fetch(getBaseUrl() + '/projects/updateProject', options)
            .then((response)=>response.json())
            .then((data)=>console.log(data))
            window.location.reload(false)
        }
    },[newCollaborator])
    
    const options = {
        method : 'PUT',
        body : JSON.stringify({
          new_collaborator : newCollaborator,
          project_id : props.currentProjectViewed._id,
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
        <div key={user.userName} className="user-result">
            <p>{user.userName}</p>
            {!props.currentProjectViewed.collaborators.includes(user.userName) ? 
            <button className="invite-button" onClick={(e)=>{
                handleAdd(e, user.userName)
            }}>Add</button>:
            <button className="invite-button" disabled={true}>Joined</button>}
            
        </div>
        
        )
        
        
        })}
    </div> );
}
 
export default UserList;