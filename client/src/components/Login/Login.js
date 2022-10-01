import { useState } from "react";
import {useNavigate} from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();

    const [userName , setUserName] = useState('');
    const [password , setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const options = {
            method : 'POST',
            body : JSON.stringify({
                userName : userName,
                password : password,
            }),
            headers : {
                'Content-Type' : 'application/json'
            }
        }
    
        const response = await fetch ('/login' , options)
        const data = await response.json();
        if (data.user){
            localStorage.setItem('user', JSON.stringify(data))
        }
        navigate('/')
        window.location.reload(false);

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