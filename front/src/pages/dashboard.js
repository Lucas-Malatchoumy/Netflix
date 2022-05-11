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
  const [data, setData] = useState([]);

  useEffect(() => {
    getMovies();
  }, []);

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
            getFavs(element);
          });
        }
      });
  }

  function getMovies() {
    axios
      .get("http://localhost:3001/Netflix/movies/genres")
      .then((response) => {
        setCategories(response.data);
      });
  }

  function getFavs(element) {
    axios
      .get(`http://localhost:3001/Netflix/user/getFiveFavs/${element.id}`)
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
      <Footer user={data.id}/>
    </div>
  );
}
export default Dashboard;
