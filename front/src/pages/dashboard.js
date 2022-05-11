import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Category from "../components/movieByCat";
import Footer from "../components/footer";
import("./categories.css");

function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [favs, setFavs] = useState([]);
  let location = useLocation();
  console.log(location);
  let data = location.state;

  useEffect(() => {
    getMovies();
    getFavs();
  }, []);

  function getMovies() {
    axios
      .get("http://localhost:3001/Netflix/movies/genres")
      .then((response) => {
        setCategories(response.data);
      });
  }

  function getFavs() {
    axios
      .get(`http://localhost:3001/Netflix/user/getFiveFavs/${data.id}`)
      .then((response) => {
        setFavs(response.data);
      });
  }

  return (
    <div>
      <h1 className="category-title">Your last Favories</h1>
      <div className="category">
        <div className="category-movies">
          {favs.map((movie) => {
            return (
              <Link to={`/movies/${movie.id}`}>
                <div className="card-movie" key={movie.id}>
                  <img src={movie.image}></img>
                  <span>{movie.title}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      {categories.map((category) => {
        return (
          <div className="category" key={category.id}>
            <Category key={category.id} category={category} />
          </div>
        );
      })}
      <Footer />
    </div>
  );
}
export default Dashboard;
