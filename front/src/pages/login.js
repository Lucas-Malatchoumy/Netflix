import React, { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import Navbar from "./homeNav";
import axios from "axios";

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    let navigate = useNavigate();

    function checkUser(e) {
      e.preventDefault();
        axios.post("http://localhost:3001/Netflix/user/login", {
            email: email,
            password: password,
        }).then((response) => {
            if (response.data.error) {
              setError(response.data.error);
              setEmail("");
              setPassword("");
            }
            else {
              localStorage.setItem('token', response.data)
              navigate('/dashboard');
            }
        })
    }

  return (
    <div>
      <Navbar />
      <form className="login">
      <div className="form-column text-light form-outline form-white">
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="input form-control form-white bg-dark" value={email} onChange={(event) => { setEmail(event.target.value); setError("") } } />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="input form-control form-white bg-dark" value={password} onChange={(event) => { setPassword(event.target.value); setError("") } } />
        </div>
      </div>
      <button type="submit" className="btn btn-success mt-3" onClick={checkUser}>Login</button>
      {error && <div className="error"> {error} </div>}
  </form>
    </div>
  );
}
export default Login;