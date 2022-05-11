import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Footer(props) {
  const [nbMoviesWatch, setnbMoviesWatch] = useState([]);
  const [nbMFavs, setNbFavs] = useState([]);
  const user = props.user;

  useEffect(() => {
    getInfo();
  },);

    function getInfo() {
        axios
          .get(`http://localhost:3001/Netflix/user/nbView/${user}`)
          .then((response) => {
            if (response.data.message) {
              alert(response.data.message);
            } else {
              response.data.forEach((element) => {
                setnbMoviesWatch(element.nb);
              });
            }
          });
          axios
          .get(`http://localhost:3001/Netflix/user/countFavs/${user}`)
          .then((response) => {
            if (response.data.message) {
              alert(response.data.message);
            } else {
              response.data.forEach((element) => {
                setNbFavs(element.nb);
              });
            }
          });
      }
  return (
    <div className="footer">
        <div class="text-center p-4">
            Number of movies seen
            <span>{nbMoviesWatch}</span>
            Number of Favories
            <span>{nbMFavs}</span>
            <a class="text-reset fw-bold" href="https://mdbootstrap.com/">MDBootstrap.com</a>
        </div>
    </div>
  );
}
export default Footer;