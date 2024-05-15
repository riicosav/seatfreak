function DisplayMovie({movieProps, bookSeats, deleteMovie2}) {
    const {selectedMovies, setSelectedMovies, error} = movieProps
    // Sorts and add movies by date
    const moviesByDate = selectedMovies.reduce((acc, movie) => {
        // If the date group doesn't exist, create it
        if (!acc[movie.day]) {
        acc[movie.day] = [];
        }
        // Add the movie to the corresponding date group
        acc[movie.day].push(movie);
        return acc;
    }, {});

    // Sort the days of the week
    const sortedDays = Object.keys(moviesByDate).sort((a, b) => {
        if (a === 'Monday') return -1; // Monday comes first
        if (b === 'Monday') return 1;
        return a.localeCompare(b); // Sort other days alphabetically
    });

    // Sort the time slots within each day
    const sortedMoviesByDate = {};
    sortedDays.forEach(day => {
        sortedMoviesByDate[day] = moviesByDate[day].sort((a, b) => {
        // Extract the start time from the time slot string
        const startTimeA = a.time.split('-')[0];
        const startTimeB = b.time.split('-')[0];
        // Compare the start times
        return startTimeA.localeCompare(startTimeB);
        });
    });

  return (
    <div>
      {/* List of Added Movies */}
      <div>
        {error && (
          <div id="errorSection">
            <h2>Error:</h2>
            <p>{error}</p>
          </div>
        )}
        <div className="movie-list">
          <h2>
            <center>Schedules</center>
          </h2>

          {sortedDays.map((day) => (
            <div key={day}>
              {sortedMoviesByDate[day].map((movie, index) => (
                <div key={index} className="movie-card">
                  <div className="row no-gutters">
                    <div className="gradient-img col-md-4">
                      <img
                        className="img-fluid dp-img"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                      />
                    </div>
                    <div className="col">
                      <h3> {movie.title}</h3>
                      <p>Day: {movie.day}</p>
                      <p>Time: {movie.time}</p>
                      <br />
                      <div className="dmButtons">
                        <button
                          type="button"
                          className="btn btn-custom-primary"
                          onClick={()=>bookSeats(movie.index)}
                        >
                          Book Seats
                        </button>
                        <button
                          class="btn btn-custom-danger"
                          onClick={() => deleteMovie2(movie.index)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DisplayMovie;
