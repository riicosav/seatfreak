import Row from "./Row.js"

function Column({ seatData }) {
    return (
        <div className="col mx-3">

            
            { 
              seatData.map((row)=>(
                <Row key={row.id}seatData={row.row}/>
              
              ))
            }
        </div>
    )
}

export default Column;
