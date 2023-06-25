import React, { useEffect, useState, useTransition } from 'react'
import Tile from './Tile';
import './App.css';
import "./Tile.css"

const App = () => {
  const [allData, setAllData] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch("https://botw-compendium.herokuapp.com/api/v2/all")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch Hyrule data!")
        }
        return response.json()
      })
      .then(data => {
        setAllData(data["data"]["creatures"]["food"])
        setError(null)
      })
      .catch(error => {
        setError(error.message)
      })
  }, [])


  return (
    <div className="background-image">
      {error && <p>Error: {error}</p>}
      <div className='tile-container'>
        {allData.map(item => {
          return <Tile 
            key={item["id"]}
            title={item["name"]}
            image={item["image"]}
          />
        })}
      </div>
    </div>
  );
}

export default App;
