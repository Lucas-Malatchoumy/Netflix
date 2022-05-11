import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MdFavoriteBorder } from "react-icons/md";
import ReactPlayer from "react-player";
import("./movie.css");

function Movie() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState([]);
  const [casting, setCasting] = useState([]);

  useEffect(() => {
    getMovie();
  }, []);

  function getMovie() {
    axios
      .get(`http://localhost:3001/Netflix/movies/${movieId}`)
      .then((response) => {
        if (response.data.message) {
          alert(response.data.message);
        } else {
          response.data.forEach((element) => {
            setMovie(element);
          });
        }
      });
    axios
      .get(`http://localhost:3001/Netflix/movies/${movieId}/actors`)
      .then((response) => {
        if (response.data.message) {
          alert(response.data.message);
        } else {
          setCasting(response.data);
        }
      });
  }

  function favs() {
    axios
      .get(`http://localhost:3001/Netflix/user/addToFavs/${movieId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data.message) {
          alert(response.data.message);
        }
      });
  }
  function addView() {
    axios
      .get(`http://localhost:3001/Netflix/user/addView/${movieId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data.message) {
          alert(response.data.message);
        } else {
          console.log(response.data);
        }
      });
  }

  return (
    <div key={movie.id} className="section">
      <div className="movie">
        <img id="poster" src={movie.image}></img>
        <div className="info">
          <h1>
            {movie.title}({movie.year})
          </h1>
          <div className="casting">
            {casting.map((actor) => {
              return <span key={actor.id}>{actor.actor} </span>;
            })}
            <span> {movie.duration} minutes </span>
            <span> (-{movie.parental_rating})</span>
            <span>
              <MdFavoriteBorder onClick={favs} />
            </span>
          </div>
          <h3>Description : </h3>
          <p className="description">{movie.description}</p>
        </div>
      </div>
      <ReactPlayer
          url="https://youtu.be/_SQVLIqqUww"
          onStart={addView}
          muted
          width="100%"
          height="500px"
        />
    </div>
  );
}
export default Movie;
