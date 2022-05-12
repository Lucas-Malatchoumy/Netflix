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
    
    // <div classNameName="footer">
    //     <div className="text-center p-4">
    //         Number of movies seen
    //         <span>{nbMoviesWatch}</span>
    //         Number of Favories
    //         <span>{nbMFavs}</span>
    //         <a className="text-reset fw-bold" href="https://mdbootstrap.com/">MDBootstrap.com</a>
    //     </div>
    // </div>
    <section className="py-24 position-relative mt-5 pb-5">
  <div className="container">
    <div className="row">
      <div className=" col-12 col-md-6 mb-8 mb-md-0">
        <div className="py-10 py-md-16 stats shadow">
          <div className="text-center">
            <p className="mb-1 fw-bold small" style={{color: 'white'}}>Number of movies seen</p>
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