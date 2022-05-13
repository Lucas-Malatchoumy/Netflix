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

    function deleteUser() {
      axios.delete("http://localhost:3001/Netflix/user/delete", {
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
    }

    function toggleModal(e) {
      e.preventDefault();
      setModal(true);
    }

  return (
    <form className="profile">
      <div className="form-row text-light form-outline form-white">
        <div className="form-group col-md-6">
          <label>First name</label>
          <input type="text" className="input form-control bg-dark" value={data.firstName} readOnly />
        </div>
        <div className="form-group col-md-6">
          <label>Last name</label>
          <input type="text" className="input form-control bg-dark" value={data.lastName} readOnly />
        </div>
      </div>
      <div className="form-group text-light form-outline form-white">
        <label>Email</label>
        <input type="email" className="input form-control bg-dark" value={data.email}  />
      </div>
      <div className="form-group text-light form-outline form-white">
        <label >Address</label>
        <input type="text" className="input form-control bg-dark" value={data.adress} readOnly />
      </div>
      <div className="form-row text-light form-outline form-white">
        <div className="form-group col-md-6">
          <label>City</label>
          <input type="text" className="input form-control bg-dark" value={data.city} readOnly />
        </div>
        <div className="form-group col-md-4">
          <label>Profile</label>
          <input type="text" className="input form-control bg-dark" value={data.profile} readOnly />
        </div>
        <div className="form-group col-md-2">
          <label>Zip</label>
          <input type="text" className="input form-control bg-dark" value={data.zipCode} readOnly />
        </div>
      </div>
      <div class="d-grid gap-2 mt-3">
        <button type="submit" className="btn btn-warning mt-2" onClick={toggleModal}>Modify</button>
      </div>
      {modal && <Modal setModal={setModal} data={data} />}
  </form>
  );
}
export default Profile;