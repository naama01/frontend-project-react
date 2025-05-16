import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function SelectComponent() {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <form>
            <FormControl fullWidth>
                <InputLabel id="meal-select-label">בחר מנה</InputLabel>
                <Select
                    labelId="meal-select-label"
                    value={selectedOption}
                    onChange={handleChange}
                    label="בחר מנה"
                    required
                >
                    <MenuItem value="">בחר אפשרות</MenuItem>
                    <MenuItem value="burger">המבורגר</MenuItem>
                    <MenuItem value="pizza">פיצה</MenuItem>
                    <MenuItem value="salad">סלט</MenuItem>
                </Select>
            </FormControl>
            <button type="submit">שלח</button>
        </form>
    );
}

export default SelectComponent;




