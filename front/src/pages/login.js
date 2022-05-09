import React, { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import Navbar from "./homeNav";
import axios from "axios";

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    function checkUser(e) {
      e.preventDefault();
        axios.post("http://localhost:3001/Netflix/user/login", {
            email: email,
            password: password,
        }).then((response) => {
            if (response.data.error) {
              console.log(response.data.error);
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
      <form className="register">
      <div className="form-row">
        <div className="form-group col-md-6">
          <label>Email</label>
          <input type="email" className="form-control" onChange={(event) => { setEmail(event.target.value); } } />
        </div>
        <div className="form-group col-md-6">
          <label>Password</label>
          <input type="email" className="form-control" onChange={(event) => { setPassword(event.target.value); } } />
        </div>
      </div>
      <button type="submit" className="btn btn-primary mt-2" onClick={checkUser}>Login</button>
  </form>
    </div>
  );
}
export default Login;