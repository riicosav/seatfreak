import { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar.js";
import Theatre from "./Components/Theatre.js";
import AddMovie from "./Components/Movies/AddMovie.js";
import DisplayMovie from "./Components/Movies/DisplayMovie.js";
import { seatData } from "./Components/Data.js";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [error, setError] = useState('');
  const [seatingVisible, setSeatingVisible] = useState(false);
  
  const [switchPage, setSwitchPage] = useState(false);
  const newSeatData1 = JSON.parse(JSON.stringify(seatData));
  const [exampleMovieList, setExampleMovieList] = useState([newSeatData1]);
  const [selectedMovie, setSelectedMovie] = useState(exampleMovieList[0]);
  const initialTempMovie = JSON.parse(JSON.stringify(exampleMovieList[0]));
  const [tempMovie, setTempMovie] = useState(initialTempMovie);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [newMovieId, setNewMovieId] = useState(exampleMovieList.length);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [movieIndex, setMovieIndex] = useState(1);

  const [visibleComponent, setVisibleComponent] = useState([]);

  const switchClick = () => {
    setSwitchPage((switchPage)=>switchPage=true);
  }

  const switchExit = () =>{
    setSwitchPage((switchPage)=>switchPage=false);
  }

function addSelectedSeats(data) {
    setSelectedSeats((prev)=>[...prev, data]);
}

function deleteSelectedSeats(data) {
  setSelectedSeats((prev)=>prev.filter((seat)=> seat !== data));
}
async function handleChange(event) {
  const theIndex = event.target.selectedIndex;
  setSelectedIndex(theIndex);
  console.log(event.target.selectedIndex+"hi");
 

  setSelectedMovie(exampleMovieList[theIndex]);
  const theTemp = JSON.parse(JSON.stringify(exampleMovieList[theIndex]))
  setTempMovie(theTemp);
  console.log(selectedMovie[0].id);
  setSelectedSeats([]);
}

async function bookSeats(theIndex) {

    let finalIndex = 0;

    for(let i = 0; i < exampleMovieList.length; i++) {
      //console.log("The Index: " + theIndex + " and: " + exampleMovieList[i][0].id);
      if(exampleMovieList[i][0].id === theIndex) {
          finalIndex = i;
          break;
      }
    }

    
    setSelectedIndex(finalIndex);
    setSelectedMovie(exampleMovieList[finalIndex]);
    const theTemp = JSON.parse(JSON.stringify(exampleMovieList[finalIndex]))
    setTempMovie(theTemp);
    switchClick();
    setSelectedSeats([]);
   
  

}

async function deleteMovie2(theIndex) {
  let finalIndex = 0;
  let finalIndex2 = 0;
  const newList = [...exampleMovieList];
  const newSelectedList = [...selectedMovies];
    for(let i = 0; i < exampleMovieList.length; i++) {
    
      console.log("The Index: " + theIndex + " and: " + exampleMovieList[i][0].id);
      if(exampleMovieList[i][0].id === theIndex) {
          finalIndex = i;
          console.log(i);
          break;
      }
    }

    for(let a = 0; a < selectedMovies.length; a++) {
      console.log(selectedMovies[a].index);
      if(selectedMovies[a].index === theIndex) {
          finalIndex2 = a;
          break;
      }
    }

    newSelectedList.splice(finalIndex2, 1);
    newList.splice(finalIndex, 1);
    setExampleMovieList(newList);
    setSelectedMovies(newSelectedList);
    setTempMovie(exampleMovieList[0]);
    setSelectedSeats([])
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

async function saveChange(e) {
  e.preventDefault();
  setExampleMovieList(prevList => {
    const newList = [...prevList];
    newList[selectedIndex] = tempMovie;
    return newList;
  });
  setSelectedSeats([])

}

   // Fetches data from API
   async function fetchData() {
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=8afd20db7a02b0d89cbf914ffd94fdb3`;
    const options = {
      method: "GET",
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
  };

  const toggleComponent = (componentName) => {
    if(componentName === "displayMovie") {
      switchExit();
    }

    setVisibleComponent(componentName);
  };

  let displayPage =  <div className="container">
  <DisplayMovie
   switchClick={() => toggleComponent("displayMovie")}
    movieProps={{
      selectedMovies: selectedMovies,
      setSelectedMovies: setSelectedMovies,
      error: error,
    }}
    bookSeats={bookSeats}
    deleteMovie2={deleteMovie2}
  
  />
</div>

  if(switchPage) {

    let displaySeats =  <Theatre 
    seatData={tempMovie[0].data} 
    addSelectedSeats={addSelectedSeats} 
    deleteSelectedSeats={deleteSelectedSeats}/>

    if(displaySeats) {
      <Theatre 
    seatData={tempMovie[0].data} 
    addSelectedSeats={addSelectedSeats} 
    deleteSelectedSeats={deleteSelectedSeats}/>
    }
    displayPage = 
    <div >

<div className="theatreHalf1">
<p className="theTitle">{selectedMovie[0].movieTitle}</p>
            <div className="screenContainer">
                <div className="screen">
               
                </div>
            </div>
            
            <div className="d-flex">
              <p className="px-3">{selectedMovie[0].day}</p>
              <p>|</p>
              <p className="px-3">{selectedMovie[0].time}</p>
              <p>|</p>
              <p className="px-3">Price: ₱{selectedMovie[0].price}</p>
            </div>
            <ul class="showcase">
              <li>
                  <div class="seatMini"></div>
                    <small>N/A</small>
                  
              </li>
              <li>
                  <div class="seatClickedMini"></div>
                    <small>Selected</small>
                  
              </li>
              <li>
                  <div class="seatBookedMini"></div>
                    <small>Booked</small>
                  
              </li>
            </ul>
            
           
          
            
        </div>
                    <div className="customContainer">
            
            
            {displaySeats} 
           
            
          </div>
          <div className="theatreHalf2">
          <p class="text"> 
              You have selected <span className="textYellow"><strong>{selectedSeats.length}</strong></span> seats for a price of<span className="textGreen"><strong> ₱{selectedSeats.length * tempMovie[0].price}</strong></span>
            </p>
          <button
              type="button"
              className="btn btn-custom-primary customButton1"
              onClick={saveChange}
            >
              Save
            </button>
           </div>
          </div>
        

    
  }

  return (
    <div className="full-screen">
      <div className="navbar">
        <Navbar
          setDatesAppear={() => toggleComponent("addMovie")}
          setSeatingAppear={() => toggleComponent("displayMovie")}
          setHomeAppear={() => toggleComponent("home")}
        />
      </div>

      {visibleComponent === "home" && (
        <div className="center">
          <h1 className="text-center">SeatFreak</h1>
        </div>
      )}

      {visibleComponent === "addMovie" && (
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
            }
          }

          setMovieIndex={setMovieIndex}
          movieIndex={movieIndex}
          />
        </div>
      )}

      {visibleComponent === "displayMovie" && (
        <div> {displayPage}</div>
       
      )}

      {visibleComponent === ""}
    </div>

    

    
  );
}

export default App;
