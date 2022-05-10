import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Category from "../components/movieByCat";
import("./categories.css");

function Dashboard() {
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [nbMoviesWatch, setnbMoviesWatch] = useState([]);

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    nbView();
  }, [nbMoviesWatch]);

  function getMovies() {
    axios
      .get("http://localhost:3001/Netflix/movies/genres")
      .then((response) => {
        setCategories(response.data);
      });
  }

  function nbView() {
    axios
      .get(`http://localhost:3001/Netflix/user/nbView`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data.message) {
          alert(response.data.message);
        } else {
          response.data.forEach((element) => {
            setnbMoviesWatch(element.nb);
          });
        }
      });
  }
  return (
    <div>
      <span>{nbMoviesWatch}</span>
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
