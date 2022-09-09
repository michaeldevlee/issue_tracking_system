import { useState } from "react";

const Login = () => {

    const [userName , setUserName] = useState('');
    const [password , setPassword] = useState('');

    const handleSubmit = async (e) => {

        const options = {
            method : 'POST',
            body : JSON.stringify({
                email : userName,
                password : password,
            }),
            headers : {
                'Content-Type' : 'application/json'
            }
        }

        const response = await fetch ('/login' , options)
        console.log(response);
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