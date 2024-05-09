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
  const [exampleMovieList, setExampleMovieList] = useState([seatData]);
  const [selectedMovie, setSelectedMovie] = useState(exampleMovieList[0]);
  //const [tempMovie, setTempMovie] = useState(exampleMovieList[0]);

  const switchClick = () => {
    setSwitchPage((switchPage)=>!switchPage);
  }
  
  function addNewMovie() {
    

    
    const newSeatData = JSON.parse(JSON.stringify(seatData));

    
    newSeatData[0].movieTitle = `example ${exampleMovieList.length}`;
    newSeatData[0].id = exampleMovieList.length;
    newSeatData[0].data[0].id = exampleMovieList.length + 3;
    newSeatData[0].data[1].id = exampleMovieList.length + 4;
    newSeatData[0].data[2].id = exampleMovieList.length + 5;


    setExampleMovieList((exampleMovieList) => [...exampleMovieList, newSeatData]);
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
  const selectedIndex = event.target.selectedIndex;
  setSelectedMovie(exampleMovieList[selectedIndex]);
  //setTempMovie(exampleMovieList[selectedIndex]);
  console.log(selectedMovie[0].id);
  

} 

function handleSeatChange() {

}


function saveChanges(e) {
  e.preventDefault();

}

if(switchPage) {

  let displayMovie = <div>
    <p>{selectedMovie[0].movieTitle}</p>
    <Theatre seatData={selectedMovie[0].data} />
   
    </div>

  if(selectedMovie) {
    displayMovie = <div>
    <p>{selectedMovie[0].movieTitle}</p>
    <Theatre seatData={selectedMovie[0].data} />
   
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
    <button type="button" className="btn btn-primary" onClick={saveChanges}>Save</button>
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


