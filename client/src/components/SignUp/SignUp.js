import { useState } from "react";
import getBaseUrl from "../../utils/getBaseUrl";

const SignUp = () => {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async  (evt)=>{
        evt.preventDefault();

        const options = {
            method : 'POST',
            credentials : 'include',
            body : JSON.stringify({
                userName : userName,
                password : password,
                confirmPassword : confirmPassword,
                email : email,
            }),
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Credentials' : true,
            }
        }

        const response = await fetch (getBaseUrl() + '/signup', options);

    }

    return ( 
    <div>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username</label>
                <input 
                required
                type="text" 
                name="username" 
                id="username"
                onChange={(e)=>{setUserName(e.target.value)}}/>
            </div>
            <div>
                <label>Email</label>
                <input 
                required
                type="text" 
                name="email" 
                id="email"
                onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div>
                <label>Password</label>
                <input 
                required
                type="text" 
                name="password" 
                id="password" 
                onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
            <div>
                <label>Confirm Password</label>
                <input 
                required
                type="text" 
                name="confirm-password" 
                id="confirm-password"
                onChange={(e)=>{setConfirmPassword(e.target.value)}} />
            </div>
            <div>
                <button type="submit">Sign Up</button>
            </div>
        </form>
    </div>
     );
}
 
export default SignUp;