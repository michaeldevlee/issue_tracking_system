import { useEffect, useState } from "react"
import getBaseUrl from "../../../../utils/getBaseUrl";

const UserList = (props) => {

    const [newCollaborator, setNewCollaborator] = useState('');
    

    useEffect(()=>{
        if (newCollaborator != ""){
            fetch(getBaseUrl() + '/projects/updateProject', options)
            window.location.reload(false)
        }
    },[newCollaborator])
    
    const options = {
        method : 'PUT',
        credentials : 'include',
        body : JSON.stringify({
          new_collaborator : newCollaborator,
          project_id : props.currentProjectViewed._id,
          action : 'ADD',  
        }),
        headers : {
            'Accept': 'application/json',
            'Content-Type' : 'application/json',
            'Access-Control-Allow-Credentials' : true,
        }

    }

    const handleAdd = async (e , id)=>{
        const collaborator = id;

        e.preventDefault();
        e.target.disabled = true;
        e.target.innerHTML = 'Joined';
        setNewCollaborator(collaborator);

    }

    return ( <div>
        {props.users.map((user)=>{
        return (
        <div key={user._id} className="user-result">
            <p>{user.userName}</p>
            {!props.currentProjectViewed.collaborators.includes(user._id) ? 
            <button className="invite-button" onClick={(e)=>{
                handleAdd(e, user._id)
            }}>Add</button>:
            <button className="invite-button" disabled={true}>Joined</button>}
            
        </div>
        
        )
        
        
        })}
    </div> );
}
 
export default UserList;