import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
function Login(props) {
    const host = "http://localhost:5000";
    let nevigate = useNavigate()
    const [state, setState] = useState({email:"", password:""})
    const handleSubmit = async (e)=>{
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email:state.email, password:state.password}),
          });
        const json = await response.json();
        if(json.status){
            localStorage.setItem('token', json.token);
            nevigate('/');
            props.showAlert("LoggedIn Successfully", "success")
        }
        else{
            props.showAlert("Please check your credentials and try again!...", "danger")
        }
    }
    const Change=(e)=>{
        setState({...state, [e.target.name]:e.target.value});
    }
    return (
        <div className='container'>
            <h1>Login Form</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' onChange={Change} aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={Change} placeholder="Password" />
                </div>
                <button type="button" disabled={state.email.length===0 || state.password.length===0} className="btn btn-primary my-2" onClick={handleSubmit}>Submit</button>
            </form>

        </div>
    )
}

export default Login