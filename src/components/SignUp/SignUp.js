import { useState } from "react";

const SignUp = () => {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [con_pass, setCon_Pass] = useState('');

    const handleSubmit = async  (evt)=>{
        evt.preventDefault();
        
        if (password != con_pass){
            alert('passwords dont match');
            return
        }

        const options = {
            method : 'POST',
            body : JSON.stringify({
                userName : userName,
                password : password,
                email : email,
            }),
            headers:{
                'Content-Type' : 'application/json'
            }
        }

        const response = await fetch ('/users/createUser', options);
        console.log(await response.json());

    }

    return ( 
    <div>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username</label>
                <input 
                type="text" 
                name="username" 
                id="username"
                onChange={(e)=>{setUserName(e.target.value)}}/>
            </div>
            <div>
                <label>Email</label>
                <input 
                type="text" 
                name="email" 
                id="email"
                onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div>
                <label>Password</label>
                <input 
                type="text" 
                name="password" 
                id="password" 
                onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
            <div>
                <label>Confirm Password</label>
                <input 
                type="text" 
                name="confirm-password" 
                id="confirm-password"
                onChange={(e)=>{setCon_Pass(e.target.value)}} />
            </div>
            <div>
                <button type="submit">Sign Up</button>
            </div>
        </form>
    </div>
     );
}
 
export default SignUp;