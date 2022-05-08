import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Profile(props) {
const [data, setData ] = useState([])

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
    }

  return (
    <div>
      <span>Name : </span>
      <span>{data.lastName}</span>
    </div>
  );
}
export default Profile;