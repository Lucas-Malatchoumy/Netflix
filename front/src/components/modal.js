
import React, { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

function Modal(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [profile, setProfile] = useState("");

    function handleClick(e) {
        e.preventDefault();
        const data = {
            id: props.data.id,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            city: city,
            address: address,
            zipCode: zipCode,
            profile: profile
          }
            axios.patch("http://localhost:3001/Netflix/user/update", data ).then((response) => {
              if (response.data.message) {
                alert(response.data.message)
              }
              else {
                window.location.reload(false);
              }
            })
        }
    return (

        <div className='modal'>
            <div className='modal-bcg' onClick={() => props.setModal(false)}></div>
            <form className="register modal-input">
                <div className="form-row">
                    <div className="form-group col-md-6">
                    <label for="inputFirstNAme">First name</label>
                    <input type="text" className="form-control" onChange={(event) => { setFirstName(event.target.value); } } required />
                    </div>
                    <div className="form-group col-md-6">
                    <label for="inputLastNAme">Last name</label>
                    <input type="text" className="form-control" onChange={(event) => { setLastName(event.target.value); } } required />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                    <label for="inputEmail4">Email</label>
                    <input type="email" className="form-control" placeholder="Email" onChange={(event) => { setEmail(event.target.value); } } required />
                    </div>
                    <div className="form-group col-md-6">
                    <label for="inputPassword4">Password</label>
                    <input type="password" className="form-control"  placeholder="Password" onChange={(event) => { setPassword(event.target.value); } } required />
                    </div>
                </div>
                <div className="form-group">
                    <label for="inputAddress">Address</label>
                    <input type="text" className="form-control"  onChange={(event) => { setAddress(event.target.value); } } required  />
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                    <label for="inputCity">City</label>
                    <input type="text" className="form-control" onChange={(event) => { setCity(event.target.value); } } required />
                    </div>
                    <div className="form-group col-md-4">
                    <label for="inputState">Profile</label>
                    <input type="text" className="form-control" onChange={(event) => { setProfile(event.target.value); } } required />
                    </div>
                    <div className="form-group col-md-2">
                    <label for="inputZip">Zip</label>
                    <input type="text" className="form-control"  onChange={(event) => { setZipCode(event.target.value); } } required />
                    </div>
                </div>
                <button type="submit" className="btn btn-danger mt-2" onClick={handleClick} >Update</button>
            </form>
        </div>
    )
}
export default Modal;