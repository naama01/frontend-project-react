import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

const labels = {
    0.5: 'גרוע מאוד',
    1: 'אכזבה',
    1.5: 'פחות מהמצופה',
    2: 'בסדר',
    2.5: 'סביר',
    3: 'טעים',
    3.5: 'כיוון טוב',
    4: 'טעים מאוד',
    4.5: 'כמעט מושלם',
    5: 'מושלם',
  };
  

export default function DishRate({ rate}) {
rate = parseInt(rate);
  return (
    <Box sx={{ width: 300, display: 'flex', alignItems: 'center', mt:1 , mb:1 }}    >
      <Rating
        name="size-small"
        value={rate ? rate : 0}
        readOnly
        size="small"
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55, fontSize: '14px' }} fontSize="inherit" />}
        icon={<StarIcon style={{ fontSize: '14px' }}  />}
      />
      <Box sx={{ ml: 1, color: 'text.secondary', fontSize: '12px' }}>{labels[rate]}</Box>
    </Box>
  );
}