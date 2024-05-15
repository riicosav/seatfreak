import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faStar } from "@fortawesome/free-solid-svg-icons";

function AddMovie({ movieProps }) {
  const [movieIndex, setMovieIndex] = useState(1);

  const {
    movies,
    selectedMovies,
    setSelectedMovies,
    query,
    setQuery,
    setError,
    fetchData,
    setNewMovieId,
    newMovieId,
    setExampleMovieList,
    exampleMovieList,
    seatData,
  } = movieProps;

  const [filterType, setFilterType] = useState("");
  const [genre, setGenre] = useState("");

  // Add Movie function
  async function addMovie(movie, day, time, price) {
    const isDuplicate = selectedMovies.some((selectedMovie) => {
      return selectedMovie.day === day && selectedMovie.time === time;
    });

    if (isDuplicate) {
      setError(
        "There is already a movie at that time! Please remove it first."
      );
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    } else {
      setSelectedMovies((prevState) => [
        ...prevState,
        {
          ...movie,
          day: day,
          time: time,
          price: price,
          index: movieIndex,
        },
      ]);

      // Deep clone the seatData structure
      const newSeatData = JSON.parse(JSON.stringify(seatData));

      // Generate unique IDs for the new movie
      setNewMovieId((newMovieId) => newMovieId + exampleMovieList.length);
      const newColumnIdStart = newMovieId * 7 + 21;
      const newRowIdStart = newMovieId * 14 + 1;

      // Set movie title and ID
      console.log(selectedMovies);
      newSeatData[0].movieTitle = movie.title;
      newSeatData[0].day = day;
      newSeatData[0].time = time;
      newSeatData[0].id = newMovieId;
      newSeatData[0].price = price;

      // Set IDs for seats, columns, and rows
      newSeatData[0].data.forEach((column, columnIndex) => {
        column.id = newMovieId * 7 + columnIndex + 1;

        column.column.forEach((row, rowIndex) => {
          row.id = newRowIdStart + rowIndex;

          row.row.forEach((seat, seatIndex) => {
            seat.id = newColumnIdStart + columnIndex + seatIndex * 7;
          });
        });
      });

      // Deep clone the existing movie list and append the new movie
      const newList = [...exampleMovieList, newSeatData];

      // Update the state with the new movie list
      setExampleMovieList(newList);
    }
  }

  async function setMovie(movie, day, time) {
    const newSeatData = JSON.parse(JSON.stringify(seatData));

    // Generate unique IDs for the new movie
    setNewMovieId((newMovieId) => newMovieId + exampleMovieList.length);
    const newColumnIdStart = newMovieId * 7 + 21;
    const newRowIdStart = newMovieId * 14 + 1;
  }

  // Searching in IMDB Database
  async function searchHandler(e) {
    e.preventDefault();
    fetchData();
  }

  // Filter and sort movies
  function filterAndSortMovies(movies) {
    let filteredMovies = movies;

    if (genre) {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.genre_ids.includes(parseInt(genre))
      );
    }

    if (filterType === "name") {
      filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filterType === "year") {
      filteredMovies.sort(
        (a, b) => new Date(a.release_date) - new Date(b.release_date)
      );
    }

    return filteredMovies;
  }

  // Function to render star rating
  function renderStarRating(rating) {
    const percentage = (rating / 10) * 100; // Convert rating to percentage
    return (
      <div className="star-rating">
        <div className="star-rating-top" style={{ width: `${percentage}%` }}>
          {[...Array(5)].map((_, index) => (
            <FontAwesomeIcon key={index} icon={faStar} className="star-icon" />
          ))}
        </div>
        <div className="star-rating-bottom">
          {[...Array(5)].map((_, index) => (
            <FontAwesomeIcon key={index} icon={faStar} className="star-icon" />
          ))}
        </div>
      </div>
    );
  }

  const max = 10;

  return (
    <div>
      {/* Search function and Display of Movies from IMDB API */}
      <div className="gFeatures">
        <div className="search-box">
          <input
            type="text"
            className="search"
            placeholder="Search a movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchHandler(e);
              }
            }}
          />
          {/* Star Rating */}
          <span className="search-icon">
            <FontAwesomeIcon icon={faSearch} style={{ color: "black" }} />
          </span>{" "}
          *
        </div>

        {/* Filters */}
        <div className="filters">
          <select
            className="filter-dropdown"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">Sort by...</option>
            <option value="name">Name</option>
            <option value="year">Year</option>
          </select>

          <select
            className="filter-dropdown"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">Filter by Genre...</option>
            <option value="28">Action</option>
            <option value="12">Adventure</option>
            <option value="16">Animation</option>
            <option value="35">Comedy</option>
            <option value="80">Crime</option>
            <option value="99">Documentary</option>
            <option value="18">Drama</option>
            <option value="10751">Family</option>
            <option value="14">Fantasy</option>
            <option value="36">History</option>
            <option value="27">Horror</option>
            <option value="10402">Music</option>
            <option value="9648">Mystery</option>
            <option value="10749">Romance</option>
            <option value="878">Science Fiction</option>
            <option value="10770">TV Movie</option>
            <option value="53">Thriller</option>
            <option value="10752">War</option>
            <option value="37">Western</option>
          </select>
        </div>
      </div>
      <div>
        <div className="movieContent">
          <ul className="movie-grid">
            {filterAndSortMovies(movies)
              .slice(0, max)
              .map((movie, index) => (
                <li key={index} className="movie-item">
                  <div className="movie-content">
                    <img
                      className="dp-img"
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <div className="movie-details">
                      <h5 className="movie-title">{movie.title}</h5>
                      <h5 className="movie-date">
                        {new Date(movie.release_date).getFullYear()}
                      </h5>
                      <p>{renderStarRating(movie.vote_average)}</p>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          const day = e.target.day.value;
                          const time = e.target.time.value;
                          let price = e.target.price.value;
                          if (!price) {
                            price = 0;
                            console.log("price is empty");
                          }
                          addMovie(movie, day, time, price);
                          setMovieIndex((prevIndex) => prevIndex + 1);
                          console.log("Movie Index: " + movieIndex);
                        }}
                      >
                        <div>
                          <p>Set Date and Time:</p>
                          <div className="row">
                            <div className="col">
                              <select id="day">
                                <option>Monday</option>
                                <option>Tuesday</option>
                                <option>Wednesday</option>
                              </select>
                            </div>
                            <div className="col">
                              <select id="time">
                                <option>1:00-3:00pm</option>
                                <option>3:30-4:30pm</option>
                                <option>5:00-7:00pm</option>
                              </select>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <p>Price:</p>
                            </div>
                            <div className="col">
                              <input
                                className="price"
                                type="number"
                                id="price"
                                placeholder="0"
                              ></input>
                            </div>
                          </div>
                          <hr />
                          <button type="submit" className="add-button">
                            Add Movie
                          </button>
                        </div>
                        <br />
                      </form>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AddMovie;
