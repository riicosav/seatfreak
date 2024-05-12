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

  const [switchPage, setSwitchPage] = useState(false);
  const newSeatData1 = JSON.parse(JSON.stringify(seatData));
  const [exampleMovieList, setExampleMovieList] = useState([newSeatData1]);
  const [selectedMovie, setSelectedMovie] = useState(exampleMovieList[0]);
  const initialTempMovie = JSON.parse(JSON.stringify(exampleMovieList[0]));
  const [tempMovie, setTempMovie] = useState(initialTempMovie);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [newMovieId, setNewMovieId] = useState(exampleMovieList.length);

  const switchClick = () => {
    setSwitchPage((switchPage)=>!switchPage);
  }
  
  function addNewMovie() {
    // Deep clone the seatData structure
    const newSeatData = JSON.parse(JSON.stringify(seatData));

    // Generate unique IDs for the new movie
    setNewMovieId((newMovieId)=> newMovieId + exampleMovieList.length);
    const newColumnIdStart = newMovieId * 7 + 21;
    const newRowIdStart = newMovieId * 14 + 1;

    // Set movie title and ID
    newSeatData[0].movieTitle = `example ${newMovieId}`;
    newSeatData[0].id = newMovieId;

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


  let displayPage = 
  <div>
      <div>

          {/* Navbar */}
          <div className="navbar"> 
              <Navbar 
                setDatesAppear={setDatesAppear} 
                setSeatingAppear={setSeatingAppear}
              />
              <button type="button" class="btn btn-primary"onClick={() => switchClick()}>Switch to Theatre</button>
          </div>

          {/* To Show Components dynamically */}
            {datesVisible && (
              <div className="container2"> 
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
            

              
                
              
          </div>
  </div>
  

function handleChange(event) {
  const theIndex = event.target.selectedIndex;
  setSelectedIndex(theIndex);
  console.log(event.target.selectedIndex+"hi");
 

  setSelectedMovie(exampleMovieList[theIndex]);
  const theTemp = JSON.parse(JSON.stringify(exampleMovieList[theIndex]))
  setTempMovie(theTemp);
  console.log(selectedMovie[0].id);
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

function saveChange(e) {
  e.preventDefault();
  setExampleMovieList(prevList => {
    const newList = [...prevList];
    newList[selectedIndex] = tempMovie;
    return newList;
  });
}




if(switchPage) {

  let displayMovie = <div>
    <p>{selectedMovie[0].movieTitle}</p>
    <Theatre seatData={tempMovie[0].data} />
    
   
    </div>

  if(selectedMovie) {
    displayMovie = <div>
    <p>{selectedMovie[0].movieTitle}</p>
    <Theatre seatData={tempMovie[0].data} />
    
   
    </div>

  }

 
  displayPage = 
  <div>
   <h1 className="text-center">SeatFreak</h1>
    <div className="customContainer">
    <select class="form-select" aria-label="Default select example" onChange={handleChange}>
      {exampleMovieList.map((movie, index) => (<option key="index" value={movie}>{movie[0].movieTitle}{index}</option>))}
    </select>
    <button type="button" className="btn btn-primary" onClick={addNewMovie}>Add New Movie</button>

    {displayMovie}
    <button type="button" className="btn btn-primary" onClick={saveChange}>Save</button>
    <button type="button" className="btn btn-danger" onClick={deleteMovie}>Delete</button>
    </div>
  </div>
}
      

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
    
    <div>
      {displayPage}
   </div>
    
    
  );
}

export default App;


















