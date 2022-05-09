import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from '../components/modal';
import axios from "axios";

function Profile(props) {
const [data, setData ] = useState([]);
const [ modal, setModal ] = useState(false);

    useEffect(() => {
        getData()
        }, [])

    function getData() {
        axios.get("http://localhost:3001/Netflix/user/profile", {
            headers: {
                token: localStorage.getItem('token')
            }
        }).then((response) => {
            if (response.data.error) {
              console.log(response.data.error);
            }
            else {
              response.data.forEach(element => {
                  setData(element);
                  console.log(element);
              });
            }
        })
    };

    function toggleModal(e) {
      e.preventDefault();
      setModal(true);
    }

  return (
    <form className="register">
      <div className="form-row">
        <div className="form-group col-md-6">
          <label>First name</label>
          <input type="text" className="form-control" value={data.firstName} readOnly />
        </div>
        <div className="form-group col-md-6">
          <label>Last name</label>
          <input type="text" className="form-control" value={data.lastName} readOnly />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label>Email</label>
          <input type="email" className="form-control" value={data.email}  />
        </div>
      </div>
      <div className="form-group">
        <label >Address</label>
        <input type="text" className="form-control" value={data.adress} readOnly />
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label>City</label>
          <input type="text" className="form-control" value={data.city} readOnly />
        </div>
        <div className="form-group col-md-4">
          <label>Profile</label>
          <input type="text" className="form-control" value={data.profile} readOnly />
        </div>
        <div className="form-group col-md-2">
          <label>Zip</label>
          <input type="text" className="form-control" value={data.zipCode} readOnly />
        </div>
      </div>
      <button type="submit" className="btn btn-success mt-2" onClick={toggleModal}>Modify</button>
      {modal && <Modal setModal={setModal} data={data} />}
  </form>
  );
}
export default Profile;