import 'react'
import Dish from './Dish'
import '../css/DishMenu.css'
export default function UserNewOrder() {
  const dishes = [
    ["1", "סלט", "סלט טרי קצוץ", "25"],
    ["2", "לחם המכללה", "מאפה ומתבלים", "13"],
    ["3", "מאפה ללא גלוטן", "מאפה ללא גלוטן", "13"],
    ["4", "צ׳יפס", "צ׳יפס תפוח אדמה", "17"],
    ["5", "המבורגר", "בקר 200 גרם", "55"],
    ["6", "פסטה פומודורו", "פסטה ברוטב עגבניות", "45"],
    ["7", "פיצה אישית", "רטוב עגבניות, מוצרלה וזיתים", "25"],
    ["8", "צהריים של אמא", "אורז שעועית עם בשר בקר", "45"],
    ["9", "אדממה", "150 גרם", "22"]
  ]

  return (
    <div className="dishMenu">
      {dishes.map(function (item, i) {
        return <div key={i}>{<Dish dishId={item[0]} dishName={item[1]} desc={item[2]} price={item[3]} />}</div> // need to add picture when moving to real data
      })}
    </div>
  )
}
