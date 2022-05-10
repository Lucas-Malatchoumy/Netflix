import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";

function Navbar() {
  const [filter, setFilter] = useState("title");
  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  let navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    axios
      .get("http://localhost:3001/Netflix/user/profile", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          response.data.forEach((element) => {
            setData(element);
          });
        }
      });
  }
  function Search(e) {
    e.preventDefault(); 
    setSearchParams({movie: search})
  }

  function logOut() {
    localStorage.removeItem("token");
    navigate("./home");
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/dashboard">
          Netfrick
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/favourite" state={data}>
                Favourite Movies
              </Link>
            </li>
            <li className="nav-item">
              <Link className="navbar-brand nav-link" to="/profile">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                  width="30"
                  height="30"
                  alt=""
                ></img>
              </Link>
            </li>
            <li className="mr-3">
              <span className="nbMovie">Nombre de films regardé : </span>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-danger" onClick={logOut}>
                Log out
              </button>
            </li>
          </ul>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(event) => { setSearch(event.target.value); }}
            />
            <button className="btn btn-outline-success" type="submit" onClick={Search}>
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
