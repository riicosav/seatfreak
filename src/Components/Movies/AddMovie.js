function AddMovie({movieProps}) {
    const { movies, selectedMovies, setSelectedMovies, query, setQuery, setError, fetchData } = movieProps;
    // Add movie function
    function addMovie(movies, day, time) {
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
            ...movies,
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

    const max=3;
    return (
        <div> 
            {/* Search function and Display of Movies from IMDB API */}
        <form onSubmit={searchHandler}>
            <input
            type="text"
            value={query}
            placeholder="Search a movie..."
            onChange={(e) => setQuery(e.target.value)}
            />
        </form>
        <ul>
            {movies.slice(0, max).map((movie, index) => (
                <li key={index}>
                    <p>{movie.l}</p>
                    <p>Release Date: {movie.y}</p>
                    <p>Rating: {movie.rank}</p>
                    {movie.i ? (
                    <img src={movie.i.imageUrl} alt={movie.l} className="img" />
                    ) : (
                    <p>No poster available</p>
                    )}
                    <br />
                    <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const day = e.target.day.value;
                        const time = e.target.time.value;
                        addMovie(movie, day, time);
                    }}
                    >
                    <p>Set Date and Time:</p>
                    <select id="day">
                        <option>Monday</option>
                        <option>Tuesday</option>
                        <option>Wednesday</option>
                    </select>
                    <br />
                    <select id="time">
                        <option>1:00-3:00pm</option>
                        <option>3:30-4:30pm</option>
                        <option>5:00-7:00pm</option>
                    </select>
                    <br />
                    <button type="submit">Add Movie</button>
                    </form>
                </li>
            ))}
        </ul>
        </div>
    )
}

export default AddMovie;