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
                <Link className="navbar-brand" to='/dashboard'>Netfrick</Link>
                <button className="navbar-toggler" type="button">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item mr-5">
                    <Link to='/login'><button className="btn btn-outline-success ">Login</button></Link>
                    </li>
                    <li className="nav-item">
                    <Link to='/register'><button className="btn btn-outline-primary">Register</button></Link>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar