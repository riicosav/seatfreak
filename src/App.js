import { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar.js";
import Theatre from "./Components/Theatre.js";
import AddMovie from "./Components/Movies/AddMovie.js";
import DisplayMovie from "./Components/Movies/DisplayMovie.js";
import backdrop from "./images/backdrop2.png";
import { seatData } from "./Components/Data.js";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [error, setError] = useState("");
  const [seatingVisible, setSeatingVisible] = useState(false);

  const [switchPage, setSwitchPage] = useState(false);
  const newSeatData1 = JSON.parse(JSON.stringify(seatData));
  const [exampleMovieList, setExampleMovieList] = useState([newSeatData1]);
  const [selectedMovie, setSelectedMovie] = useState(exampleMovieList[0]);
  const initialTempMovie = JSON.parse(JSON.stringify(exampleMovieList[0]));
  const [tempMovie, setTempMovie] = useState(initialTempMovie);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [newMovieId, setNewMovieId] = useState(exampleMovieList.length);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const [visibleComponent, setVisibleComponent] = useState("home"); // Set initial state to "home"

  const switchClick = () => {
    setSwitchPage((switchPage) => (switchPage = true));
  };

  const switchExit = () => {
    setSwitchPage((switchPage) => (switchPage = false));
  };

  function addSelectedSeats(data) {
    setSelectedSeats((prev) => [...prev, data]);
  }

  function deleteSelectedSeats(data) {
    setSelectedSeats((prev) => prev.filter((seat) => seat !== data));
  }
  async function handleChange(event) {
    const theIndex = event.target.selectedIndex;
    setSelectedIndex(theIndex);
    console.log(event.target.selectedIndex + "hi");

    setSelectedMovie(exampleMovieList[theIndex]);
    const theTemp = JSON.parse(JSON.stringify(exampleMovieList[theIndex]));
    setTempMovie(theTemp);
    console.log(selectedMovie[0].id);
    setSelectedSeats([]);
  }

  async function bookSeats(theIndex) {
    let finalIndex = 0;

    for (let i = 0; i < exampleMovieList.length; i++) {
      if (exampleMovieList[i][0].id === theIndex) {
        finalIndex = i;
        break;
      }
    }
    setSelectedIndex(finalIndex);
    setSelectedMovie(exampleMovieList[finalIndex]);
    const theTemp = JSON.parse(JSON.stringify(exampleMovieList[finalIndex]));
    setTempMovie(theTemp);
    switchClick();
    setSelectedSeats([]);
  }

  async function deleteMovie2(theIndex) {
    let finalIndex = 0;
    const newList = [...exampleMovieList];
    for (let i = 0; i < exampleMovieList.length; i++) {
      if (exampleMovieList[i][0].id === theIndex) {
        finalIndex = i;
        console.log(i);
        break;
      }
    }

    newList.splice(finalIndex, 1);
    setExampleMovieList(newList);
    setTempMovie(exampleMovieList[0]);
    setSelectedSeats([]);
  }

  function deleteMovie() {
    // Deep clone the current movie list
    const newList = [...exampleMovieList];

    // Remove the selected movie from the list
    newList.splice(selectedIndex, 1);

    // Update the state with the modified movie list
    setExampleMovieList(newList);

    setTempMovie(exampleMovieList[0]);
  }

  async function saveChange(e) {
    e.preventDefault();
    setExampleMovieList((prevList) => {
      const newList = [...prevList];
      newList[selectedIndex] = tempMovie;
      return newList;
    });
    setSelectedSeats([]);
  }

  // Fetches data from API
  async function fetchData() {
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=8afd20db7a02b0d89cbf914ffd94fdb3`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YWZkMjBkYjdhMDJiMGQ4OWNiZjkxNGZmZDk0ZmRiMyIsInN1YiI6IjY2NDBlMzI2OTJkNzFkMjc0NWMxMjFmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.t4nZwRFJu94kEOyEDE-lsvClAVXqznrAm7cM2jwFFYY",
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error(error);
    }
  }

  const toggleComponent = (componentName) => {
    if (componentName === "displayMovie") {
      switchExit();
    }

    setVisibleComponent(componentName);
  };

  let displayPage = (
    <div className="container">
      <DisplayMovie
        switchClick={() => toggleComponent("displayMovie")}
        movieProps={{
          selectedMovies: selectedMovies,
          setSelectedMovies: setSelectedMovies,
          error: error,
        }}
        bookSeats={bookSeats}
        deleteMovie2={deleteMovie2}
      />
    </div>
  );

  if (switchPage) {
    let displaySeats = (
      <Theatre
        seatData={tempMovie[0].data}
        addSelectedSeats={addSelectedSeats}
        deleteSelectedSeats={deleteSelectedSeats}
      />
    );

    if (displaySeats) {
      <Theatre
        seatData={tempMovie[0].data}
        addSelectedSeats={addSelectedSeats}
        deleteSelectedSeats={deleteSelectedSeats}
      />;
    }
    displayPage = (
      <div className="customContainer">
        <div>
          <p>{selectedMovie[0].movieTitle}</p>
          <p>{selectedMovie[0].day}</p>
          <p>{selectedMovie[0].time}</p>
          <p>₱{selectedMovie[0].price}</p>

          {displaySeats}
        </div>
        <p class="text">
          You have selected <span>{selectedSeats.length}</span> seats for a
          price of ₱<span>{selectedSeats.length * tempMovie[0].price}</span>
        </p>
        <button type="button" className="btn btn-primary" onClick={saveChange}>
          Save
        </button>
        <button type="button" className="btn btn-danger" onClick={deleteMovie}>
          Delete
        </button>
      </div>
    );
  }

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
          <img src={backdrop} alt="" />
          <div className="welcome-msg">
            <h1 className="text-center">SeatFreak</h1>
            <p>Watch in comfort.</p>
            <button className="btn btn-warning">Start Now</button>
          </div>
        </div>
      )}

      {visibleComponent === "addMovie" && (
        <div className="container-movie-page">
          <AddMovie
            movieProps={{
              movies: movies,
              query: query,
              setQuery: setQuery,
              selectedMovies: selectedMovies,
              setSelectedMovies: setSelectedMovies,
              setError: setError,
              fetchData: fetchData,
              setNewMovieId: setNewMovieId,
              newMovieId: newMovieId,
              setExampleMovieList: setExampleMovieList,
              exampleMovieList: exampleMovieList,
              seatData: seatData,
            }}
          />
        </div>
      )}

      {visibleComponent === "displayMovie" && <div> {displayPage}</div>}

      {visibleComponent === ""}
    </div>
  );
}

export default App;
