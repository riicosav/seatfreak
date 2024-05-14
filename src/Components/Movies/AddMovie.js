import React, { useState } from "react";

function AddMovie({ movieProps }) {
  const {
    movies,
    selectedMovies,
    setSelectedMovies,
    query,
    setQuery,
    setError,
    fetchData,
  } = movieProps;

  const [filterType, setFilterType] = useState("");
  const [genre, setGenre] = useState("");

  // Add movie function
  function addMovie(movie, day, time) {
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
        },
      ]);
      setError("");
    }
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

  const max = 3;

  return (
    <div>
      {/* Search function and Display of Movies from IMDB API */}
      <div className="gFeatures">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search a movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchHandler(e);
              }
            }}
          />
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
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search a movie..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchHandler(e);
                }
              }}
            />
          </div>
          Filters
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
                        <h5>{movie.title}</h5>
                        <p>Release Date: {movie.release_date}</p>
                        <p>Rating: {movie.vote_average}</p>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            const day = e.target.day.value;
                            const time = e.target.time.value;
                            addMovie(movie, day, time);
                          }}
                        >
                          <div>
                            <p>Set Date and Time:</p>
                            <div>
                              <select id="day">
                                <option>Monday</option>
                                <option>Tuesday</option>
                                <option>Wednesday</option>
                              </select>
                            </div>
                            <div>
                              <select id="time">
                                <option>1:00-3:00pm</option>
                                <option>3:30-4:30pm</option>
                                <option>5:00-7:00pm</option>
                              </select>
                            </div>
                          </div>
                          <br />
                          <button type="submit" className="add-button">
                            Add Movie
                          </button>
                        </form>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddMovie;
