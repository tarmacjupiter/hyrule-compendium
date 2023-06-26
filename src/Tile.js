import React from 'react'

const Tile = ({id, title, image, position}) => {
    const tileStyle = {
        backgroundImage: `url(${image})`,
        order: position
    }
    return (
        <div>
            <h6 style={{ color: "white", textAlign: "center" }}><em>{title.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</em></h6>
            <div key={id} className="tile" style={tileStyle}></div>
        </div>
    )
}

export default Tile;