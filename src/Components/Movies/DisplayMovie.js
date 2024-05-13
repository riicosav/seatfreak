function DisplayMovie({movieProps, bookSeats}) {
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

    // Remove movie function
    async function removeMovie(indexToRemove) {
        const newSelectedMovies = selectedMovies.filter((_, index) => index !== indexToRemove);
        setSelectedMovies(newSelectedMovies);
    }

    return (
        <div> 
            {/* List of Added Movies */}
            <div>
                <h2>List of Movies:</h2>
                {error && (
                <div id="errorSection">
                    <h2>Error:</h2>
                    <p>{error}</p>
                </div>
                )}
                <div>
                {sortedDays.map(day => (
                    <div key={day}>
                    <h2 className="date-text">{day}</h2>
                    <div className="movie-row">
                        {sortedMoviesByDate[day].map((movie, index) => (
                        <div key={index} className="movie-card">
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="img" />
                            <br />
                            <p>Title: {movie.title}</p>
                            <p>Day: {movie.release_date}</p>
                            <p>Time: {movie.vote_average}</p>
                            <br /> <button onClick={() => removeMovie(index)}>Remove</button>
                            <button onClick={() => bookSeats(movie.index)}>Book Seats</button>
                        </div>
                        ))}
                    </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}

export default DisplayMovie;