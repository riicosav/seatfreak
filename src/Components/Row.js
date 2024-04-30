import Seat from './Seat.js'

function Row({ seatData }) {
    return (
        <div className="row">
           {seatData.map((seat, index) => (
                <Seat key={index} seatData={seat} />
            )) }
        </div>
    )
}

export default Row;