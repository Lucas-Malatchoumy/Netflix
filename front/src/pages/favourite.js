import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";

function Fav(props) {
  const category = props.category;
  const [movies, setMovies] = useState([])
  let location = useLocation()
  console.log(location);
  let data = location.state;

  useEffect(() => {
    getMovies()
    }, [])

    function getMovies() {
        axios.get(`http://localhost:3001/Netflix/user/getFavs/${data.id}`).then((response) => {
          setMovies(response.data)
        });
    }
  return (
    <><div className="category-favoris container">
      <h1 className="category-title">Your list</h1>
      <div className="row">
        {movies.map((movie) => {
          return (
            <div className="col-md-3 mt-3 mb-3">
              <Link to={`/movies/${movie.id}`}>
              <div className="card-movie" key={movie.id}>
               <img src={movie.image}></img>
               <span>{movie.title}</span>
               </div>
             </Link>
            </div>
          );
        })}
      </div>
    </div></>
  );
}
export default Fav;