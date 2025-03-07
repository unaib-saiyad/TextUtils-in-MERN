import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
function Navbar() {
  let location = useLocation();
  let navigate = useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate('/login')
  }
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">iNotebook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/"?"active": ""}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/about/"?"active": ""}`} to="about/">About</Link>
            </li>
          </ul>
          <div className="d-flex" role="search">
            {!localStorage.getItem('token')? <><Link to='/login' type='button' className="btn btn-primary p-2 mx-2">Login</Link>
            <Link to='/signup' type='button' className="btn btn-warning p-2 mx-2">Signup</Link></>: <button type='button' onClick={handleLogout} className="btn btn-danger">Logout</button>}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar