import { useState } from "react"
import getBaseUrl from "../../../utils/getBaseUrl";
import UserList from "./UserList/UserList";

const InviteUserModal = (props) => {

    const [userName , setUserName] = useState('');
    const [users , setUsers] = useState('');

    const handleClose = (e)=>{
        if(e.target.classList.contains('modal-overlay') || e.target.classList.contains('exit-modal-button')){
            props.setInviteUserModalStatus(false)
            setUsers('')
        }
    }

    const searchUser = async (e)=>{
        e.preventDefault();

        const options = {
            method : 'POST',
            credentials: 'include',
            body : JSON.stringify({
                userName : userName,
            }),
            headers : {
                'Accept': 'application/json',
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Credentials': true
            },

        }

        const response = await fetch(getBaseUrl() + '/users/searchUsers', options)
        const data = await response.json();
        setUsers(data.users)
        
        
    }

    if (props.inviteUserModalStatus){
        return ( <div className="modal-overlay" onClick={(e)=>handleClose(e)}>
        <div className="modal" id="invite-user-modal">
            <button onClick={(e)=>handleClose(e)} className="exit-modal-button">X</button>
            <form onSubmit={(e)=>{searchUser(e)}}>
                <h2>Invite</h2>
                <label >Username</label>
                <div id="invite-user-search-bar">
                    <input type="text" onChange={(e)=>setUserName(e.target.value)}/>
                    <button>Search</button>
                </div>
                
            </form>
            <div className="user-search-results">
                {users ? <UserList users={users} currentProjectViewed={props.currentProjectViewed}/> : null}
                </div>

            </div>
        </div> )
    }

}
 
export default InviteUserModal;