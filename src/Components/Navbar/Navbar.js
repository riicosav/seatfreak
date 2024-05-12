
function Navbar({setDatesAppear, setSeatingAppear}) {
    
    return (

        <div>
            <button className="button" onClick={setDatesAppear}> Add Movies </button>
            <button className="button" onClick={setSeatingAppear}> My Movies</button>
        </div>

    )
}

export default Navbar