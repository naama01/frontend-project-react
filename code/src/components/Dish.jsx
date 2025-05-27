import { useState } from 'react';
import '../css/Dish.css'; // Import the CSS file
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'; // Import Typography for read-only display
import { useCart } from '../components/CartContext';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DishRate from './DishRate';

export default function Dish({ dishId, dishName, desc, price, prepTime, AllowBuy , rate}) {
    const { addToCart } = useCart(); // Access the addToCart function from the context
    const [total, setTotal] = useState(1);
    const [imgExists, setImgExists] = useState(true); // Track if the image exists
    if (!AllowBuy) { AllowBuy = false }

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
            {/* Left third: Image */}
            <div className="dish-image-container">
                {imgExists ? (
                    <img
                        src={`https://miznono-dfdc3.firebaseapp.com/img/dishes/${dishId}.jpg`}
                        alt="תמונת המנה"
                        className="dish-image"
                        onError={() => setImgExists(false)} // Remove the image if it fails to load
                    />
                ) : (
                    <div className="dish-image-placeholder">
                        תמונה לא זמינה
                    </div>
                )}
            </div>

            {/* Right two-thirds: Content */}
            <div className="dish-content">
                <div>
                    <h2 className="dish-title">{dishName}</h2> <DishRate rate={rate} />
                    <p className="dish-description">{desc}</p>
                </div>
                <div>
                    <p className="dish-price">{price} ש״ח</p>
                    <p className="dish-prep-time"> זמן הכנה: {prepTime} דקות</p>
                    
                </div>
                {AllowBuy && <div className="dish-controls">
                    <ButtonGroup variant="text" color="primary" aria-label="">
                        <Button className="dish-button" onClick={() => changeTotal("0")}>
                            <RemoveIcon />
                        </Button>
                        <Typography
                            className="dish-quantity"
                            variant="body1"
                            component="span"
                        >
                            {total}
                        </Typography>
                        <Button className="dish-button" onClick={() => changeTotal("1")}>
                            <AddIcon />
                        </Button>
                        <Button className="dish-button" onClick={handleAddToCart}>
                            הוסף לעגלה
                        </Button>
                    </ButtonGroup>
                </div>
                }
            </div>
        </div>
    );
}


