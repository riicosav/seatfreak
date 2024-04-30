import logo from './logo.svg';
import './App.css';
import Seat from './Components/Seat.js';
import Column from './Components/Column.js';
import { seatData } from './Components/Data.js';
import Theatre from './Components/Theatre.js';

function App() {
  return (
    <div>
      <h1 className="text-center">SeatFreak</h1>
      <div className="container">
       
          <Theatre seatData={seatData}/>
        

      
        
        
      </div>
    </div>
    //hello
  );
}

export default App;


