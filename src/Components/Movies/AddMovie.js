function AddMovie({ movieProps }) {
    const { movies, selectedMovies, setSelectedMovies, query, setQuery, setError, fetchData } = movieProps;
  
    // Add movie function
    function addMovie(movie, day, time) {
      const isDuplicate = selectedMovies.some(selectedMovie => {
        return selectedMovie.day === day && selectedMovie.time === time;
      });
  
      if (isDuplicate) {
        setError('There is already a movie at that time! Please remove it first.')
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      } else {
        setSelectedMovies(prevState => [
          ...prevState,
          {
            ...movie,
            day: day,
            time: time
          }
        ]);
        setError('');
      }
    }
  
    // Searching in IMDB Database
    async function searchHandler(e) {
      e.preventDefault();
      fetchData();
    }
  
    const max = 3;
  
    return (
      <div> 
        {/* Search function and Display of Movies from IMDB API */}
    
          <form className="search-container" onSubmit={searchHandler}>
            <input
              type="text"
              value={query}
              placeholder="Search a movie..."
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
    
        <div>
          <ul className="movie-grid">
            {movies.slice(0, max).map((movie, index) => (
              <li key={index} className="movie-item">
                <div className="movie-content">
                  {movie.i ? (
                    <img src={movie.i.imageUrl} alt={movie.l} />
                  ) : (
                    <p>No poster available</p>
                  )}
                  <div className="movie-details">
                    <h5>{movie.l}</h5>
                    <p>Release Date: {movie.y}</p>
                    <p>Rating: {movie.rank}</p>
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
                        <div>  <select id="day">
                        <option>Monday</option>
                        <option>Tuesday</option>
                        <option>Wednesday</option>
                      </select></div>
                        <div> <select id="time">
                        <option>1:00-3:00pm</option>
                        <option>3:30-4:30pm</option>
                        <option>5:00-7:00pm</option>
                      </select></div>
                      </div>

                     
                      <br />
                      <button type="submit" className="add-button">Add Movie</button>
                    </form>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  
  export default AddMovie;
