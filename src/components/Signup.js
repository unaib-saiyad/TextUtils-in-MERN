import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';

function Signup(props) {
    const host = "http://localhost:5000";
    const [state, setState] = useState({name:"", email:"", password:""})
    let nevigate = useNavigate();

    const handleSubmit = async (e)=>{
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name:state.name, email:state.email, password:state.password}),
          });
        const json = await response.json();
        if(json.status){
            nevigate('/login');
            props.showAlert("Account created successfully...", "success")
        }
        else{
            props.showAlert(json.error, "danger")
        }
    }

    const Change=(e)=>{
        setState({...state, [e.target.name]:e.target.value});
    }

    return (
        <div className='container'>
            <h1>SignUp Form</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" name='name' onChange={Change} aria-describedby="emailHelp" placeholder="Enter Name" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' onChange={Change} aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={Change} placeholder="Password" />
                </div>
                <button type="button" disabled={state.name.length <3 || state.email.length ===0 || state.password.length === 0} className="btn btn-primary my-2" onClick={handleSubmit}>Submit</button>
            </form>

        </div>
    )
}

export default Signup