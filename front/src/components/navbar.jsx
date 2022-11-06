import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Navbar() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  function getData() {
    axios
      .get('http://localhost:3001/Netflix/user/profile', {
        headers: {
          token: localStorage.getItem('token'),
        },
      })
      .then((response) => {
        if (response.data.error) {
          return false;
        }
        response.data.forEach((element) => {
          setData(element);
        });
      });
  }
  useEffect(() => {
    getData();
  }, []);

  function logOut() {
    localStorage.removeItem('token');
    navigate('./home');
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/dashboard" state={data}>
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
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/favourite" state={data}>
                Favorite Movies
              </Link>
            </li>
            <li className="nav-item">
              <Link className="navbar-brand nav-link" to="/profile">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                  width="30"
                  height="30"
                  alt=""
                />
              </Link>
            </li>
            <li className="nav-item">
              <button type="submit" className="btn btn-outline-danger" onClick={logOut}>
                Log out
              </button>
            </li>
          </ul>
          <form className="d-flex">
            {data.roleId === 2 && (
            <Link className="nav-link" to="/favourite" state={data}>
              Admin
            </Link>
            )}
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(event) => { setSearch(event.target.value); }}
            />
            <Link to="/search-results" state={search}>
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </Link>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
