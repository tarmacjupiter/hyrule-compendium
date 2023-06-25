import React from 'react'


const Tile = ({title, image}) => {
    const tileStyle = {
        backgroundImage: `url(${image})`
    }


    return (
        <div className="tile" style={tileStyle}>
            <h6>{title}</h6>
        </div>
    )
}

export default Tile;