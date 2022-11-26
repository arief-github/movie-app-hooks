import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Movie from "./components/Movie";
import Search from "./components/Search";
import "./styles.css";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=5fcd3a00";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then((res) => res.json())
      .then((jsonResponse) => {
        setMovies(jsonResponse.Search);
        setIsLoading(false);
      });
  }, []);

  const search = (searchValue) => {
    setIsLoading(true);
    setErrorMessage(null);

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=5fcd3a00`)
      .then((res) => res.json())
      .then((jsonResponse) => {
        if (jsonResponse.Response === "True") {
          setMovies(jsonResponse.Search);
          setIsLoading(false);
        } else {
          setErrorMessage(jsonResponse.Error);
          setIsLoading(false);
        }
      });
  };

  return (
    <div className="App">
      <Header text="Iflix" />
      <Search search={search} />
      <p className="App-intro">Lihat Review Film terkini di Iflix</p>
      <div className="movies">
        {isLoading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
}
