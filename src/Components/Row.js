
import Seat from './Seat.js'

function Row({ seatData }) {
    return (
        <div className="row">
           {seatData.map((seat) => (
                
                <Seat key={seat.id}seatData={seat} />   
                
            )) }
        </div>
    )
}

export default Row;
