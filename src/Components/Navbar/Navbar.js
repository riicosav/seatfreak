
function Navbar({setDatesAppear, setSeatingAppear}) {
    
    return (
        <div>
            <button className="button" onClick={setDatesAppear}> Set Movie Dates </button>
            <button className="button" onClick={setSeatingAppear}> Set Movie Seats </button>
        </div>
    )
}

export default Navbar