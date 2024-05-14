import { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar.js";
import Theatre from "./Components/Theatre.js";
import AddMovie from "./Components/Movies/AddMovie.js";
import DisplayMovie from "./Components/Movies/DisplayMovie.js";
import { seatData } from "./Components/Data.js";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [error, setError] = useState("");
  const [visibleComponent, setVisibleComponent] = useState("home");

  const [exampleMovieList, setExampleMovieList] = useState([seatData]);
  const [selectedMovie, setSelectedMovie] = useState(seatData);
  const [tempMovie, setTempMovie] = useState(seatData);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [newMovieId, setNewMovieId] = useState(exampleMovieList.length);

  const addNewMovie = () => {
    const newSeatData = JSON.parse(JSON.stringify(seatData));
    setNewMovieId((id) => id + 1);
    newSeatData[0].movieTitle = `example ${newMovieId}`;
    newSeatData[0].id = newMovieId;
    setExampleMovieList((prev) => [...prev, newSeatData]);
  };

  const handleChange = (event) => {
    const theIndex = event.target.selectedIndex;
    setSelectedIndex(theIndex);
    setSelectedMovie(exampleMovieList[theIndex]);
    setTempMovie(JSON.parse(JSON.stringify(exampleMovieList[theIndex])));
  };

  const deleteMovie = () => {
    setExampleMovieList((prev) => {
      const newList = [...prev];
      newList.splice(selectedIndex, 1);
      return newList;
    });
    setTempMovie(exampleMovieList[0]);
  };

  const saveChange = (e) => {
    e.preventDefault();
    setExampleMovieList((prev) => {
      const newList = [...prev];
      newList[selectedIndex] = tempMovie;
      return newList;
    });
  };

  const fetchData = async () => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=8afd20db7a02b0d89cbf914ffd94fdb3`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer YOUR_BEARER_TOKEN",
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleComponent = (componentName) => {
    setVisibleComponent(componentName);
  };

  return (
    <div className="full-screen">
      <div className="navbar">
        <Navbar
          setDatesAppear={() => toggleComponent("addMovie")}
          setSeatingAppear={() => toggleComponent("displayMovie")}
          setHomeAppear={() => toggleComponent("home")}
        />
      </div>

      {visibleComponent === "home" && (
        <div className="center">
          <h1 className="text-center">SeatFreak</h1>
        </div>
      )}

      {visibleComponent === "addMovie" && (
        <div className="container-movie-page">
          <AddMovie
            movieProps={{
              movies,
              query,
              setQuery,
              selectedMovies,
              setSelectedMovies,
              setError,
              fetchData,
            }}
          />
        </div>
      )}

      {visibleComponent === "displayMovie" && (
        <div className="container">
          <DisplayMovie
            switchClick={() => toggleComponent("displayMovie")}
            movieProps={{
              selectedMovies,
              setSelectedMovies,
              error,
            }}
          />
        </div>
      )}

      {visibleComponent === "displayMovie" && (
        <div className="customContainer">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleChange}
          >
            {exampleMovieList.map((movie, index) => (
              <option key={index} value={movie}>
                {movie[0].movieTitle}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="btn btn-primary"
            onClick={addNewMovie}
          >
            Add New Movie
          </button>
          <div>
            <p>{selectedMovie[0].movieTitle}</p>
            <Theatre seatData={tempMovie[0].data} />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={saveChange}
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={deleteMovie}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
