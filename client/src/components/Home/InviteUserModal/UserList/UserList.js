const UserList = (props) => {
    console.log(props.users)
    return ( <div>
        {props.users.map((user)=>{
        return (
        <div key={user.userName}>
            <p>{user.userName}</p>
            {!props.currentProjectViewed.collaborators.includes(user.userName) ? 
            <button>Add</button>:
            <button disabled={true}>Joined</button>}
            
        </div>
        
        )
        
        
        })}
    </div> );
}
 
export default UserList;