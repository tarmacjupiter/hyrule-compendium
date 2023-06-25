import React, { useEffect, useState, useTransition } from 'react'
import Tile from './Tile';
import './App.css';
import "./Tile.css"

const App = () => {
  const [allData, setAllData] = useState([])
  const [error, setError] = useState(null)

  // Searching State
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])

  // Fetching API data from Zelda API
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

  // Creating Searching Function
  useEffect(() => {
    if(allData.length === 0) {
      setSearchResults([])
      return;
    }
    const results = allData.filter(item => 
      item["name"].toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results)
  }, [searchTerm, allData])

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  }


  return (
    <div className="background-image">
      {error && <p>Error: {error}</p>}
      <div>
        <input 
          type="text"
          placeholder='Search Hyrule!'
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
    <div className='tile-container'>
      {searchResults.length === 0 ? (
        allData.map(item => (
        <Tile
        key={item.id}
        title={item.name}
        image={item.image}
      />
    ))
  ) : (
    searchResults.map(item => (
      <Tile
        key={item.id}
        title={item.name}
        image={item.image}
      />
    ))
  )}
</div>

    </div>
  );
}

export default App;
