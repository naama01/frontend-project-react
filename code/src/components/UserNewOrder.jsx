import React, { useState, useEffect } from 'react';
import Dish from './Dish';
import '../css/DishMenu.css';
import { fireReadCollection } from '../firebase';
import { useCart } from './CartContext'; // Import the useCart hook
import { Container } from '@mui/material'; // Correct import for Container
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function UserNewOrder() {
  const dataname = "dishes"; // Firestore collection name
  const [rows, setRows] = useState([]);
  const [dataEnabled, setDataEnabled] = useState([]); // State for filtered items
  const { cart, currentStudentId, setCurrentStudentId } = useCart(); // Access student ID from context
  const [filterName, setFilterName] = useState(''); // State for search input
  const [filterPrice, setFilterPrice] = useState(0); // State for price filter
  const [filterPrepTime, setFilterPrepTime] = useState(0); // State for preparation time filter
  const [filterRate, setFilterRate] = useState(0); // State for rating filter

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


  const handleSearchChange = (event) => {
    setFilterName(event.target.value); // Update search input state
  };

  const resetFilters = () => {
    setFilterName(''); // Reset search input
    setFilterPrice(0); // Reset price filter
    setFilterPrepTime(0); // Reset preparation time filter
    setFilterRate(0); // Reset rating filter
    setDataEnabled(rows); // Reset filtered data to original rows
  }
  const applyFilters = () => {
    let filteredData = rows;

    // Apply name filter
    if (filterName) {
      filteredData = filteredData.filter(item =>
        item["שם המנה"].includes(filterName)
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
<Container maxWidth="lg">
  <Box
    sx={{
      p: 3,
      bgcolor: 'background.paper',
      borderRadius: 2,
      boxShadow: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
    }}
  >
    <Stack direction={{  xs: 'column', md: 'row' }} spacing={3} flexWrap="wrap">
      <Box >
        <Typography variant="subtitle2" gutterBottom>
          שם מנה
        </Typography>
        <TextField
          fullWidth
          onChange={handleSearchChange}
          variant="outlined"
        />
      </Box>

      <Box sx={{ flex: 1, minWidth: 200 }}>
        <Typography variant="subtitle2" gutterBottom>
          מחיר מקסימלי: {filterPrice} ₪
        </Typography>
        <Slider
          value={filterPrice}
          onChange={(e, val) => setFilterPrice(val)}
          valueLabelDisplay="auto"
          min={0}
          max={100}
        />
      </Box>

      <Box sx={{ flex: 1, minWidth: 200 }}>
        <Typography variant="subtitle2" gutterBottom>
          זמן הכנה מקסימלי: {filterPrepTime} דקות
        </Typography>
        <Slider
          value={filterPrepTime}
          onChange={(e, val) => setFilterPrepTime(val)}
          valueLabelDisplay="auto"
          min={0}
          max={120}
        />
      </Box>

      <Box sx={{ flex: 1, minWidth: 200 }}>
        <Typography variant="subtitle2" gutterBottom>
          דירוג מינימלי: {filterRate} כוכבים
        </Typography>
        <Slider
          value={filterRate}
          onChange={(e, val) => setFilterRate(val)}
          valueLabelDisplay="auto"
          min={0}
          max={5}
          step={0.5}
        />
      </Box>
    </Stack>

    <Stack direction="row" spacing={2} justifyContent="flex-start">
      <Button
        variant="contained"
        color="primary"
        startIcon={<FilterAltIcon />}
        onClick={applyFilters}
      >
        החל סינון
      </Button>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<RestartAltIcon />}
        onClick={resetFilters}
      >
        אפס סינון
      </Button>
    </Stack>
  </Box>
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