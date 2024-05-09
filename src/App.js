import { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar.js'
import Seat from './Components/Seat.js';
import Column from './Components/Column.js';
import { seatData } from './Components/Data.js';
import Theatre from './Components/Theatre.js';
import AddMovie from './Components/Movies/AddMovie.js'
import DisplayMovie from './Components/Movies/DisplayMovie.js';


function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [error, setError] = useState('');
  const [datesVisible, setDatesVisible] = useState(false);
  const [seatingVisible, setSeatingVisible] = useState(false);

   // Fetches data from API
   async function fetchData() {
    const url = `https://imdb8.p.rapidapi.com/auto-complete?q=${query}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'ca224eb53amshd67a88c70e27f52p1d3a8cjsn12663eaca0ef',
        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setMovies(data.d);

      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  // For Toggling Visibility
  function setDatesAppear () {
    setDatesVisible(!datesVisible)
  }

  function setSeatingAppear() {
    setSeatingVisible(!seatingVisible)
  }

  return (
    <div className="full-screen">
      {/* Navbar */}
      <div className="navbar"> 
          <Navbar 
            setDatesAppear={setDatesAppear} 
            setSeatingAppear={setSeatingAppear}
          />
      </div>

      {/* To Show Components dynamically */}
        {datesVisible && (
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
                }}
              />
          </div> 
          )}

        {seatingVisible && (
          <div className="container"> 
            <DisplayMovie
              movieProps={{
                selectedMovies: selectedMovies,
                setSelectedMovies: setSelectedMovies,
                error: error,
              }}  />
          </div> 
          )}
        
      {/* Seating */}
      <div className="center">
        <div>
            <h1 className="text-center">SeatFreak</h1>
            <Theatre seatData={seatData}/>
        </div>
        
      </div>
    </div>
  );
}

export default App;
