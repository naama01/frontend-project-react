import React, { useState, useEffect } from 'react';
import Dish from './Dish';
import '../css/DishMenu.css';
import { fireReadCollection } from '../firebase';
import { useCart } from './CartContext'; // Import the useCart hook
import { Container } from '@mui/material'; // Correct import for Container
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';

export default function UserNewOrder() {
  const dataname = "dishes"; // Firestore collection name
  const [rows, setRows] = useState([]);
  const [dataEnabled, setDataEnabled] = useState([]); // State for filtered items
  const { cart, currentStudentId, setCurrentStudentId } = useCart(); // Access student ID from context

  // Fetch rows from Firestore on component mount
  useEffect(() => {
    fireReadCollection(dataname)
      .then((data) => {
        setRows(data); // Set rows from Firestore
        const enabledItems = data.filter((item) => item["פעיל"]); // Filter items where "פעיל" is true
        setDataEnabled(enabledItems); // Set the filtered items
      })
      .catch((error) => {
        console.error("Error fetching dishes:", error);
      });
  }, []);

  const [filterName, setFilterName] = useState(''); // State for search input
  const [filterPrice, setFilterPrice] = useState(0); // State for price filter
  const [filterPrepTime, setFilterPrepTime] = useState(0); // State for preparation time filter
  const [filterRate, setFilterRate] = useState(0); // State for rating filter

  const handleSearchChange = (event) => {
    setFilterName(event.target.value); // Update search input state
  };

  const applyFilters = () => {
    let filteredData = rows;

    // Apply name filter
    if (filterName) {
      filteredData = filteredData.filter(item =>
        item["שם המנה"].toLowerCase().includes(filterName.toLowerCase())
      );
    }

    // Apply price filter
    if (filterPrice > 0) {
      filteredData = filteredData.filter(item => item["מחיר"] <= filterPrice);
    }

    // Apply preparation time filter
    if (filterPrepTime > 0) {
      filteredData = filteredData.filter(item => item["זמן הכנה"] <= filterPrepTime);
    }

    // Apply rating filter
    if (filterRate > 0) {
      filteredData = filteredData.filter(item => item["דירוג"] >= filterRate);
    }

    setDataEnabled(filteredData); // Update the state with the filtered data
  };

  return (
    <div>
      <Container maxWidth="lg"> {/* Ensure Container is used correctly */}
        <div className="filterContainer">
          <div className="filterItem">
            <TextField onChange={handleSearchChange} label="חפש שם מנה" variant="outlined" />
          </div>
          <div className="filterItem">
            <label>הגבל לפי מחיר</label>
            <Slider
              defaultValue={0}
              onChange={(event, newValue) => setFilterPrice(newValue)}
              aria-label="Price Filter"
              valueLabelDisplay="auto"
            />
            <p>מחיר מסקיסמלי: {filterPrice} ש"ח</p>
          </div>
          <div className="filterItem">
            <label>הגבל לפי זמן הכנה</label>
            <Slider
              defaultValue={0}
              onChange={(event, newValue) => setFilterPrepTime(newValue)}
              aria-label="Preparation Time Filter"
              valueLabelDisplay="auto"
            />
            <p>זמן הכנה מקסימלי: {filterPrepTime} דקות</p>
          </div>
          <div className="filterItem">
            <label>הגבל לפי דירוג</label>
            <Slider
              defaultValue={0}
              onChange={(event, newValue) => setFilterRate(newValue)}
              aria-label="Rating Filter"
              valueLabelDisplay="auto"
              min={0}
              max={5}
            />
            <p>דירוג מינימלי: {filterRate}</p>
          </div>
          <Button variant="contained" color="primary" onClick={applyFilters}>
            החל סינון
          </Button>
        </div>
      </Container>

      <div className="dishMenu">
        {dataEnabled.map((item, i) => (
          <div key={i}>
            <Dish
              dishId={item["מספר מנה"]}
              dishName={item["שם המנה"]}
              desc={item["תיאור המנה"]}
              price={item["מחיר"]}
              prepTime={item["זמן הכנה"]}
              rate={item["דירוג"]}
              AllowBuy={currentStudentId != null}
            />
          </div>
        ))}
      </div>
    </div>
  );
}