import React from 'react'

const Tile = ({id, title, image, position}) => {
    const tileStyle = {
        backgroundImage: `url(${image})`,
        order: position
    }
    return (
        <div key={id} className="tile" style={tileStyle}>
            <h6 style={{ color: "#000000", fontFamily: "Rodin"}}>
                <em>{title.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</em>
            </h6> 
        </div>
    )
}

export default Tile;