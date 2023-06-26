import React, { useState } from 'react'
import ReactModal from 'react-modal';

const Tile = ({id, title, image, position, description, common_locations}) => {
    const [modalStatus, setModalStatus] = useState(false);

    function handleModalOpen () {
        setModalStatus(true);
    }

    function handleModalClose () {
        setModalStatus(false);
    }


    const tileStyle = {
        backgroundImage: `url(${image})`,
        order: position
    }
    return (
        <div>
            <h6 className='tile-top-font'><em>{title.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</em></h6>
            <div key={id} className="tile" style={tileStyle} onClick={handleModalOpen}></div>
            <ReactModal
            style={{ overlay: { zIndex: 100, backgroundColor: 'transparent' }, content: {backgroundColor: "#34312E"} }}
            isOpen={modalStatus}
            contentLabel='Description'
            >
                <div>
                    <h1 className='font-top'>{title.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</h1>
                    <h1 className='font-bot'>{description}</h1>
                    <h2 className='font-top'>Common Locations</h2>
                    <h2 className='font-bot'>{common_locations}</h2>
                    <div className='btn-modal'>
                        <button onClick={handleModalClose}>Close!</button>
                    </div>
                </div>
            </ReactModal>
        </div>
    )
}

export default Tile;