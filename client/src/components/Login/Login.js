import { useState } from "react";
import {useNavigate} from "react-router-dom";
import getBaseUrl from "../../utils/getBaseUrl";


const Login = () => {
    const navigate = useNavigate();

    const [userName , setUserName] = useState('');
    const [password , setPassword] = useState('');

    console.log(getBaseUrl())

    const handleSubmit = async (e) => {
        e.preventDefault();
        const options = {
            method : 'POST',
            withCredentials: true,
            credentials: 'include',
            body : JSON.stringify({
                userName : userName,
                password : password,
            }),
            headers : {
                'Accept': 'application/json',
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Credentials': true

            }
        }

        
        const response = await fetch ( getBaseUrl() + '/login' , options)
        const data = await response.json();
        if (data.user){
            localStorage.setItem('user', JSON.stringify(data))
        }
        navigate('/')

    }
    

    
    return ( 
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input onChange={(e)=>{setUserName(e.target.value)}} type="text" name="username" id="username"/>
                </div>
                <div>
                    <label>Password</label>
                    <input onChange={(e)=>{setPassword(e.target.value)}} type="password" name="password" id="password" />
                </div>
                <div>
                    <button type="submit" >Login</button>
                </div>
            </form>
        </div>
     );
}
 
export default Login;