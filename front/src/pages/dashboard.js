import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Category from "../components/movieByCat";
import ('./categories.css')

function Dashboard(props) {
    const [ movies, setMovies ] = useState([]);
    const [categories, setCategories] = useState([]);


useEffect(() => {
    getMovies()
    }, [])

    function getMovies() {
        axios.get("http://localhost:3001/Netflix/movies/genres").then((response) => {
          console.log(response.data);
          setCategories(response.data);
          console.log(categories);
        })
      }
  return (
    <div>
        {categories.map((category) => {
            return (
                <div className="category" key={category.id}>
                    <Category category={category} />
                </div>
            );
        })}
    </div>
  );
}
export default Dashboard;