import { useState } from "react";
import { Link } from "react-router-dom";
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
        const data = await response.json();
        console.log(data);

        if (data.error){
            console.log('error occured');
            console.log(data.error);
        }
        else{
            console.log(data.user)
            localStorage.setItem('user', JSON.stringify(data))
            window.location.reload(false);
        }



    }

    return ( 
    <div id="signup-page-container">
        <section id="signup-area" >
            <img src="/Logo.svg" id="logo"/>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>username</label>
                    <input
                    required
                    type="text"
                    name="username"
                    id="username"
                    onChange={(e)=>{setUserName(e.target.value)}}/>
                </div>
                <div>
                    <label>email</label>
                    <input
                    required
                    type="text"
                    name="email"
                    id="email"
                    onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                <div>
                    <label>password</label>
                    <input
                    required
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <div>
                    <label>confirm password</label>
                    <input
                    required
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    onChange={(e)=>{setConfirmPassword(e.target.value)}} />
                </div>
                    <button className="signup-button" type="submit">Sign Up</button>
            </form>
            <p className="back-to-login-link"><Link to="/login">Back to Login</Link></p>
        </section>
        
        <section id="signup-visual-area">
            <img src="/Signup_Visual.svg" alt="" />
        </section>
    </div>
     );
}
 
export default SignUp;