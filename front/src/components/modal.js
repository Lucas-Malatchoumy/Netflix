
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
            <form className="modal-input">
            <div className="form-row text-light form-outline form-white">
                <div className="form-group col-md-6">
                <label htmlFor="inputFirstNAme">First name</label>
                <input type="text" className="input form-control bg-dark" onChange={(event) => { setFirstName(event.target.value); } } />
                </div>
                <div className="form-group col-md-6">
                <label htmlFor="inputLastNAme">Last name</label>
                <input type="text" className="input form-control bg-dark" id="inputZip" onChange={(event) => { setLastName(event.target.value); } } />
                </div>
            </div>
            <div className="form-row text-light form-outline form-white">
                <div className="form-group col-md-6">
                <label htmlFor="inputEmail4">Email</label>
                <input type="email" className="input form-control bg-dark" id="inputEmail4" placeholder="Email" onChange={(event) => { setEmail(event.target.value); } } />
                </div>
                <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">Password</label>
                <input type="password" className="input form-control bg-dark" id="inputPassword4" placeholder="Password" onChange={(event) => { setPassword(event.target.value); } } />
                </div>
            </div>
            <div className="form-group text-light form-outline form-white">
                <label htmlFor="inputAddress">Address</label>
                <input type="text" className="input form-control bg-dark" id="inputAddress" onChange={(event) => { setAddress(event.target.value); } }  />
            </div>
            <div className="form-row text-light form-outline form-white">
                <div className="form-group col-md-6">
                <label htmlFor="inputCity">City</label>
                <input type="text" className="input form-control bg-dark" id="inputCity" onChange={(event) => { setCity(event.target.value); } } />
                </div>
                <div className="form-group col-md-4">
                <label htmlFor="inputState">Profile</label>
                <input type="text" className="input form-control bg-dark" onChange={(event) => { setProfile(event.target.value); } } />
                </div>
                <div className="form-group col-md-2">
                <label htmlFor="inputZip">Zip</label>
                <input type="text" className="input form-control bg-dark" onChange={(event) => { setZipCode(event.target.value); } } />
                </div>
            </div>
            <div class="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-danger mt-2" onClick={handleClick} >Update</button>
            </div>
            </form>
        </div>
    )
}
export default Modal;