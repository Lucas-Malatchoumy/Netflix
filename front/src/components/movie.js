import React, { useState, useEffect } from "react";
import {useParams} from 'react-router-dom';
import axios from "axios";
import ('./movie.css')



function Movie(props) {
    const { movieId } = useParams();
    const [movie, setMovie] = useState([])
    const [casting, setCasting] =useState([])

    useEffect(() => {
        getMovie()
      }, []);

    function getMovie() {
        axios.get(`http://localhost:3001/Netflix/movies/${movieId}`).then((response) => {
            if (response.data.message) {
                alert(response.data.message)
            }
            else {
                response.data.forEach(element => {
                    setMovie(element)
                });
            }
            });
            axios.get(`http://localhost:3001/Netflix/movies/${movieId}/actors`).then((response) => {
            if (response.data.message) {
                alert(response.data.message)
            }
            else {
                setCasting(response.data)
            }
            });
        }
    
  return (
        <div key={movie.id} className="movie">
            <img id="poster" src={movie.image}></img>
            <div className="info">
            <h1>
                {movie.title}
                ({movie.year})
            </h1>
            <div className="casting">
                {casting.map((actor) => {
                    return (                  
                        <span key={actor.id}>{actor.actor} </span>
                    )
                })}
                <span>  {movie.duration} minutes  </span>
                <span> (-{movie.parental_rating})</span>
            </div>
            <h3>Description : </h3>
            <p className="description">{movie.description}</p>
            </div>
        </div>
  );
}
export default Movie;