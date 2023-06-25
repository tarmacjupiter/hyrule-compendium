import React from 'react'


const Tile = ({title, description}) => {
    return (
        <div className="tile">
            <h6>{title}</h6>
            <p>{description}</p>
        </div>
    )
}

export default Tile;