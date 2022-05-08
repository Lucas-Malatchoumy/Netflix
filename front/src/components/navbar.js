import React, {useState} from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';

function Navbar() {
    const [filter, setFilter] = useState('title');
    function Filter(e) {
        setFilter(e.target.innerText)
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to='/dashboard'>Dashboard</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link className="nav-link" to='/about'>Favourite Movies</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to='/'>Profile</Link>
                    </li>
                    <li className="nav-item">
                    <button className="btn btn-outline-danger">Log out</button>
                    </li>
                </ul>
                <form className="d-flex">
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Dropdown Button
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={((e) => Filter(e))} href="#/action-1">Title</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Genre</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
                </div>
            </div>
        </nav>
    )
}

export default Navbar