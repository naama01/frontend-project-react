import { useState } from 'react';
import '../css/Dish.css'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'





export default function Dish({ dishId, dishName, desc, price }) {


    
    let imgPath = "../../img/dishes/" + dishId + ".jpg"
    price = parseInt(price)

    const [total, setTotal] = useState(0);
    function changeTotal(change) {
        if (change == "0") { // this was done to overcome react rendering miscalculation when using setTotal(total+1) directly in onClick
            if (total > 0) { setTotal(total - 1) }

        } else {
            setTotal(total + 1)
        }
    }
    return (


            
        <div className={`dish`}>

            <h2 className="title">{dishName}</h2>
            <p className="description">{desc}</p>
            
            <img src={imgPath} alt="תמונת המנה"></img>
            <p className="price">{price} ש״ח</p>
            <div className="dishCTRL">
                <ButtonGroup variant="text" color="primary" aria-label="">
                <Button  variant="text" color="primary" onClick={() => changeTotal("0")}>-</Button>
                <TextField size='small' sx={{ width: '80px' }} id="outlined-basic"  variant="outlined" 
                  value={total}
                  
                />
                <Button variant="text" color="primary" onClick={() => changeTotal("1")}>+</Button>
                <Button variant="text" color="primary" onClick={() => setTotal(0)}>🗑️</Button>
                  
                </ButtonGroup>

            </div>
        </div>

    )
}
