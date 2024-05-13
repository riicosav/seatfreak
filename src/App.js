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

//   function addNewMovie(movie, day, time, newSeatData) {
//     const isDuplicate = selectedMovies.some((selectedMovie) => {
//       return selectedMovie.day === day && selectedMovie.time === time;
//     });

//     if (isDuplicate) {
//       setError(
//         "There is already a movie at that time! Please remove it first."
//       );
//       window.scrollTo({
//         top: 0,
//         behavior: "smooth",
//       });
//       return;
//     } else {

//         // Deep clone the seatData structure
//       const newSeatData = JSON.parse(JSON.stringify(seatData));

//       // Generate unique IDs for the new movie
//       setNewMovieId((newMovieId)=> newMovieId + exampleMovieList.length);
//       const newColumnIdStart = newMovieId * 7 + 21;
//       const newRowIdStart = newMovieId * 14 + 1;

//       // Set movie title and ID
//       newSeatData[0].movieTitle = movie.title;
//       newSeatData[0].id = newMovieId;

//       // Set IDs for seats, columns, and rows
//       newSeatData[0].data.forEach((column, columnIndex) => {
//           column.id = newMovieId * 7 + columnIndex + 1;

//           column.column.forEach((row, rowIndex) => {
//               row.id = newRowIdStart + rowIndex;

//               row.row.forEach((seat, seatIndex) => {
//                   seat.id = newColumnIdStart + columnIndex + seatIndex * 7;
//               });
//           });
//       });
//       setSelectedMovies((prevState) => [
//         ...prevState,
//         {
//           ...movie,
//           day: day,
//           time: time,
//         },
//       ]);
//       setError("");
//     }

//     // Deep clone the existing movie list and append the new movie
//     const newList = [...selectedMovies, newSeatData];

//     // Update the state with the new movie list
//     setExampleMovieList(newList);
// }

  let displayPage = <div>
          <div className="full-screen">
                {/* Navbar */}
                <div className="navbar"> 
                    <Navbar 
                      setDatesAppear={setDatesAppear} 
                      setSeatingAppear={setSeatingAppear}
                    />
                                  <button type="button" class="btn btn-primary" onClick={() => switchClick()}>Switch to Theatre</button>
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
                          setNewMovieId: setNewMovieId,
                          newMovieId: newMovieId,
                          setExampleMovieList: setExampleMovieList,
                          exampleMovieList: exampleMovieList,
                          seatData: seatData,
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
                        }} 
                        bookSeats={bookSeats}
                        />
                    </div> 
                    )}
                  
                {/* Seating */}
                <div className="center">
                  <div>
                      <h1 className="text-center">SeatFreak</h1>
                      
                  </div>
                  
                </div>
              </div>
          

  </div>

async function handleChange(event) {
  const theIndex = event.target.selectedIndex;
  setSelectedIndex(theIndex);
  console.log(event.target.selectedIndex+"hi");
 

  setSelectedMovie(exampleMovieList[theIndex]);
  const theTemp = JSON.parse(JSON.stringify(exampleMovieList[theIndex]))
  setTempMovie(theTemp);
  console.log(selectedMovie[0].id);
}

async function bookSeats(theIndex) {

    setSelectedIndex(theIndex);
    setSelectedMovie(exampleMovieList[theIndex]);
    const theTemp = JSON.parse(JSON.stringify(exampleMovieList[theIndex]))
    setTempMovie(theTemp);
    switchClick();

   

}

function deleteMovie() {
  // // Deep clone the current movie list
  // const newList = [...exampleMovieList];
  
  // // Remove the selected movie from the list
  // newList.splice(selectedIndex, 1);

  // // Update the state with the modified movie list
  // setExampleMovieList(newList);

  // setTempMovie(exampleMovieList[0]);
}

async function saveChange(e) {
  e.preventDefault();
  setExampleMovieList(prevList => {
    const newList = [...prevList];
    newList[selectedIndex] = tempMovie;
    return newList;
  });

  
}

// // delete
// function saveChange2() {
//   const theTemp = JSON.parse(JSON.stringify(exampleMovieList[selectedIndex]))
//   setTempMovie(theTemp);
// }

if(switchPage) {

  let displayMovie = <div>
    <p>{selectedMovie[0].movieTitle}</p>
    <p>{selectedMovie[0].day}</p>
    <p>{selectedMovie[0].time}</p>
    <Theatre seatData={tempMovie[0].data} />
    </div>

  if(selectedMovie) {
    displayMovie = <div>
    <p>{selectedMovie[0].movieTitle}</p>
    <p>{selectedMovie[0].day}</p>
    <p>{selectedMovie[0].time}</p>
    <p>{selectedMovie[0].movieTitle}</p>
    <Theatre seatData={tempMovie[0].data} />
    </div>

  }

  displayPage = 
  <div>
   <h1 className="text-center">SeatFreak</h1>
    <div className="customContainer">
    <select className="form-select" aria-label="Default select example" onChange={handleChange}>
  {exampleMovieList.map((movie, index) => (
    <option key={index} value={index}>{movie[0].movieTitle}</option>
  ))}
</select>
    {displayMovie}
    <button type="button" className="btn btn-primary" onClick={saveChange}>Save</button>
    <button type="button" className="btn btn-danger" onClick={deleteMovie}>Delete</button>
    </div>
  </div>
}

   // Fetches data from API
   async function fetchData() {
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=8afd20db7a02b0d89cbf914ffd94fdb3`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YWZkMjBkYjdhMDJiMGQ4OWNiZjkxNGZmZDk0ZmRiMyIsInN1YiI6IjY2NDBlMzI2OTJkNzFkMjc0NWMxMjFmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.t4nZwRFJu94kEOyEDE-lsvClAVXqznrAm7cM2jwFFYY'
      }
    };
    
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      
      setMovies(data.results);
    } catch (error) {
      console.error(error)
    }
  }

  // For Toggling Visibility
  async function setDatesAppear () {
    setDatesVisible(!datesVisible)
  }

  async function setSeatingAppear() {
    setSeatingVisible(!seatingVisible)
  }

  return (
    <div>
      {displayPage}
    </div>
    
  );
}

export default App;


