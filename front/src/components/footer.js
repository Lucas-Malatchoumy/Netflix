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

    /**
     * It gets the number of movies watched by the user and the number of movies in his favorites list
     */
    function getInfo() {
        axios
          .get(`http://localhost:3001/Netflix/user/nbView/${user}`)
          .then((response) => {
            if (response.data.message) {
              alert(response.data.message);
            } else {
              setnbMoviesWatch(response.data.nb)
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
    
<section className="py-24 mt-5 pb-5 pt-4 position-sticky footer">
  <div className="container mt-5">
    <div className="row">
      <div className=" col-12 col-md-6 mb-8 mb-md-0">
        <div className="py-10 py-md-16 stats shadow">
          <div className="text-center">
            <p className="mb-1 fw-bold" style={{color: 'white'}}>Number of movies watched</p>
            <h2 className="mb-0 lh-sm" style={{color: 'red'}}>{nbMoviesWatch}</h2>
          </div>
        </div>
      </div>
      <div className=" col-12 col-md-6 mb-8 mb-md-0">
        <div className="py-10 py-md-16 stats shadow">
          <div className="text-center">
            <p className="mb-1 fw-bold" style={{color: 'white'}}>Number of Favories</p>
            <h2 className="mb-0 lh-sm" style={{color: 'red'}}>{nbMFavs}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  );
}
export default Footer;