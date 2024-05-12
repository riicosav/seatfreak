import Column from './Column.js';

function Theatre({ seatData }) {
    return (
        <div className="row">
            {seatData.map((column)=>(
                <Column key={column.id} seatData={column.column}/>
            ))}
        </div>
    )

}

export default Theatre;
