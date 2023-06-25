import React, { useEffect, useState } from 'react'
import Tile from './Tile';
import './App.css';
import "./Tile.css"

const App = () => {
  // All API Data and Categories
  const [foodData, setAllFoodData] = useState([])
  const [nonFoodData, setAllNonFoodData] = useState([])
  const [equipment, setEquipment] = useState([])
  const [materials, setMaterials] = useState([])
  const [monsters, setMonsters] = useState([])
  const [treasure, setTreasure] = useState([])

  // Complete set of all Hyrule Data
  const [allData, setAllData] = useState([])

  // State for error handling
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
        setAllFoodData(data["data"]["creatures"]["food"])
        setAllNonFoodData(data["data"]["creatures"]["non_food"])
        setEquipment(data["data"]["equipment"])
        setMaterials(data["data"]["materials"])
        setMonsters(data["data"]["monsters"])
        setTreasure(data["data"]["treasure"])

        // Efficiently appending all arrays
        setAllData([].concat.apply([], [foodData, nonFoodData, equipment, materials, monsters, treasure]))

        setError(null)
      })
      .catch(error => {
        setError(error.message)
      })
  }, [setAllData, equipment, foodData, materials, monsters, nonFoodData, treasure])

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
  }, [searchTerm, allData, allData.length])

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  }

  return (
    <div className="background-image">
      {error && <p>Error: {error}</p>}
      <div className='search-style'>
        <input 
          className='input-style'
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
