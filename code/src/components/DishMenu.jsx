import React from 'react'
import Dish from './Dish'
import '../css/DishMenu.css'
export default function DishMenu() {
 
    return (
        <div className="col-12 row dishMenu  ">
            <Dish dishId="1" dishName="סלט" desc="סלט טרי קצוץ" price="25" />
            <Dish dishId="2" dishName="לחם המכללה" desc="מאפה ומתבלים" price="13" />
            <Dish dishId="3" dishName="לחמניה ללא גלוטן" desc="מאפה ללא גלוטן" price="13" />
            <Dish dishId="4" dishName="צ׳יפס" desc="צ׳יפס תפוח אדמה" price="17" />
            <Dish dishId="5" dishName="המבורגר" desc="בקר 200 גרם" price="55" />
            <Dish dishId="6" dishName="פסטה פומודורו" desc="פסטה ברוטב עגבניות" price="45" />
            <Dish dishId="7" dishName="פיצה אישית" desc="רטוב עגבניות, מוצרלה וזיתים" price="25" />
            <Dish dishId="8" dishName="צהריים של אמא" desc="אורז שעועית עם בשר בקר" price="45" />
            <Dish dishId="9" dishName="אדממה" desc="150 גרם" price="22" />
        </div>
    )
}
