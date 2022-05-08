import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Category(props) {
  const category = props.category;
  const [movies, setMovies] = useState([])

  useEffect(() => {
    getMovies()
    }, [])

    function getMovies() {
        axios.get(`http://localhost:3001/Netflix/movies/genres/${category.genre}`).then((response) => {
          setMovies(response.data)
        });
    }
  return (
    <><h1 className="category-title">{category.genre}</h1><div key={category.id} className="category-movies">
      {movies.map((movie) => {
        return (
          <Link to={`/movies/${movie.id}`}>
            <div className="card-movie" key={movie.id}>
            <img src={movie.image}></img>
            <span>{movie.title}</span>
          </div>
          </Link>
        );
      })}
    </div></>
  );
}
export default Category;