import React, { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import Navbar from "./homeNav";
import axios from "axios";

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    function createUser(e) {
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
      <form>
        <label>
          email :
          <input type="text" onChange={(event) => {setEmail(event.target.value)}} />
        </label>
        <label>
          password :
          <input type="text" onChange={(event) => {setPassword(event.target.value)}} />
        </label>
        <button onClick={createUser}>Coucou</button>
      </form>
    </div>
  );
}
export default Login;