import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./homeNav";
import axios from "axios";

function Form(props) {
  let navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [profile, setProfile] = useState("");
    const [ movies, setMovies ] = useState([]);
    const [categories, setCategories] = useState([]);


    function createUser(e) {
      e.preventDefault()
      const data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        city: city,
        address: address,
        zipCode: zipCode,
        profile: profile
      }
        axios.post("http://localhost:3001/Netflix/user/register", data ).then((response) => {
          if (response.data.message) {
            alert(response.data.message)
          }
          else {
            localStorage.setItem('token', response.data)
            navigate('/dashboard');
          }
        })
    }

  return (
    <><Navbar />
    <form className="register">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputFirstNAme">First name</label>
          <input type="text" id="inputProfile" class="form-control" onChange={(event) => { setFirstName(event.target.value); } } />
        </div>
        <div class="form-group col-md-6">
          <label for="inputLastNAme">Last name</label>
          <input type="text" class="form-control" id="inputZip" onChange={(event) => { setLastName(event.target.value); } } />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputEmail4">Email</label>
          <input type="email" class="form-control" id="inputEmail4" placeholder="Email" onChange={(event) => { setEmail(event.target.value); } } />
        </div>
        <div class="form-group col-md-6">
          <label for="inputPassword4">Password</label>
          <input type="password" class="form-control" id="inputPassword4" placeholder="Password" onChange={(event) => { setPassword(event.target.value); } } />
        </div>
      </div>
      <div class="form-group">
        <label for="inputAddress">Address</label>
        <input type="text" class="form-control" id="inputAddress" onChange={(event) => { setAddress(event.target.value); } }  />
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputCity">City</label>
          <input type="text" class="form-control" id="inputCity" onChange={(event) => { setCity(event.target.value); } } />
        </div>
        <div class="form-group col-md-4">
          <label for="inputState">Profile</label>
          <input type="text" id="inputProfile" class="form-control" onChange={(event) => { setProfile(event.target.value); } } />
        </div>
        <div class="form-group col-md-2">
          <label for="inputZip">Zip</label>
          <input type="text" class="form-control" id="inputZip" onChange={(event) => { setZipCode(event.target.value); } } />
        </div>
      </div>
      <button type="submit" class="btn btn-primary" onClick={createUser}>Sign in</button>
  </form>
    </>
  );
}
export default Form;