import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import getBaseUrl from "../../utils/getBaseUrl";


const Login = () => {
    const navigate = useNavigate();

    const [userName , setUserName] = useState('');
    const [password , setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const options = {
            method : 'POST',
            credentials: 'include',
            withCredentials : true,
            body : JSON.stringify({
                userName : userName,
                password : password,
            }),
            headers : {
                'Accept': 'application/json',
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Credentials': true
            },

        }

        
        const response = await fetch ( getBaseUrl() + '/login' , options)
        const data = await response.json();
        if (data.user){
            localStorage.setItem('user', JSON.stringify(data))
            window.location.reload(false);
        }
        

    }
    

    
    return ( 
        <div id="login-page-container">
            <section id="login-area">
                <img src="Logo.svg" id="logo"/>
                <form onSubmit={handleSubmit}>
                    <div className="login-section">
                        <label>username</label>
                        <input onChange={(e)=>{setUserName(e.target.value)}} type="text" name="username" id="username"/>
                    </div>
                    <div className="login-section">
                        <label>password</label>
                        <input onChange={(e)=>{setPassword(e.target.value)}} type="password" name="password" id="password" />
                    </div>
                        <button type="submit" className="login-bottom">Login</button>
                </form>
                <hr id="login-break" className="login-bottom"/>
                <Link to="/signup"><button className="signup-button login-bottom" >Sign Up</button></Link>
            </section>
            <section id="login-visual-area">
                <img src="/Login_Visual.svg" alt="" />
            </section>
        </div>
     );
}
 
export default Login;