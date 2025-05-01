import { useState } from 'react';
import '../css/Dish.css';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useCart } from '../components/CartContext';

export default function Dish({ dishId, dishName, desc, price }) {
    const { addToCart } = useCart(); // Access the addToCart function from the context
    const [total, setTotal] = useState(1);

    const handleAddToCart = () => {
        if (total > 0) {
            addToCart({ dishId, dishName, price, quantity: total });
            setTotal(1); // Reset the total after adding to the cart
        } else {
            alert('אנא בחר כמות לפני הוספה לעגלה');
        }
    };

    function changeTotal(change) {
        if (change === "0") {
            if (total > 0) setTotal(total - 1);
        } else {
            setTotal(total + 1);
        }
    }

    return (
        <div className="dish">
            <h2 className="title">{dishName}</h2>
            <p className="description">{desc}</p>
            <img src={`../../img/dishes/${dishId}.jpg`} alt="תמונת המנה" />
            <p className="price">{price} ש״ח</p>
            <div className="dishCTRL">
                <ButtonGroup variant="text" color="primary" aria-label="">
                    <Button  variant="contained" color="primary" onClick={() => changeTotal("0")}>-</Button>
                    <TextField
                        size="small"
                        sx={{ width: '80px' }}
                        id="outlined-basic"
                        variant="outlined"
                        value={total}
                        readOnly
                    />
                    <Button variant="contained" color="primary" onClick={() => changeTotal("1")}>+</Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddToCart}
                    >
                        הוסף לעגלה
                    </Button>
                </ButtonGroup>

            </div>
        </div>
    );
}
