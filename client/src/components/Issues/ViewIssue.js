import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import getBaseUrl from "../../utils/getBaseUrl";

const ViewIssue = () => {
    const {id}= useParams();

    const [project, setProject]= useState({});
    const [user , setUser]= useState('user');
    const [author , setAuthor] = useState('author');

    const issue_options = {
        method : 'POST',
        body: JSON.stringify({_id : id}),
        headers : {
            'Content-Type' : 'application/json'
        }
    }

    const user_options = {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json'
        }
    }

    const getIssue = async ()=>{
        const res = await fetch (getBaseUrl() + '/issues/getIssue', issue_options);
        const issue = await res.json();
        setProject(issue.issue[0])

        
        const user = await fetch(getBaseUrl() + '/users/getUser', user_options)
        const user_data = await user.json();
        setUser(user_data.user[0].userName)
        setAuthor(project.author)

    }

    useEffect(()=>{
        getIssue();
    },[user])


    return ( <div>
        <h1>View Issue #{id}</h1>
        <h2>title</h2>
        <p>{project.projectName}</p>
        <h2>description</h2>
        <p>{project.description}</p>
        <h2>reviewer</h2>
        <p>{project.reviewer}</p>
        <h2>comments</h2>
        <p>{project.comments}</p>
        <h2>status</h2>
        <p>{project.status}</p>
        {user == author ? <button onClick={()=>{console.log('hello')}}>Edit</button>: null}
    </div> );
}
 
export default ViewIssue;