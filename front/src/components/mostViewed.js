import React, { useState, useEffect } from "react";
import axios from "axios";

function MostViewed() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    getMovies()
    }, [])

    function getMovies() {
        axios.get(`http://localhost:3001/Netflix/movies/getmostView`).then((response) => {
          console.log(response.data);
          setMovies(response.data)
        });
    }
  return (
    <><h1 className="category-title">Most Viewed Movies</h1><div className="category-movies">
      {movies.map((movie) => {
        return (
            <div className="card-movie" key={movie.id}>
             <img src={movie.image}></img>
             <span>{movie.title}</span>
            </div>
        );
      })}
    </div></>
  );
}
export default MostViewed;