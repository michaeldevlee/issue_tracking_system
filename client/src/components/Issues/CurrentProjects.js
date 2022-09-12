import { useEffect } from "react";

const CurrentProjects = () => {

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
            if (data.user.length > 0){
                data.map((project)=>{
                    return (
                        <option>{project}</option>
                    )
                })
            }
        })

    },[])

    return ( 
    <select name="|" id="|">
        <option>Add New Project</option>
        <option>Add New Project</option>
    </select>
    );
}
 
export default CurrentProjects;