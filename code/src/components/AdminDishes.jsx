import 'react'
import AdminTable from './AdminTable'

export default function AdminDishes() {
  const titles = ["מספר מנה","שם המנה","תיאור המנה","נתיב לתמונה","מחיר","זמן הכנה","פעילה"]
  const rows = [
    ["1", "סלט", "סלט טרי קצוץ" , "img/dishes/file.png", "25","10", true],
    ["2", "לחם המכללה", "מאפה ומתבלים" ,  "img/dishes/file.png", "13","10", true],
    ["3", "לחמניה ללא גלוטן", "מאפה ללא גלוטן" ,  "img/dishes/file.png", "13","2", true],
    ["4", "צ׳יפס", "צ׳יפס תפוח אדמה" ,  "img/dishes/file.png", "17","10", true],
    ["5", "המבורגר", "בקר 200 גרם" ,  "img/dishes/file.png", "55","12", true],
    ["6", "פסטה פומודורו", "פסטה ברוטב עגבניות" ,  "img/dishes/file.png", "45","7", true],
    ["7", "פיצה אישית", "רטוב עגבניות, מוצרלה וזיתים" ,  "img/dishes/file.png", "25","10", true],
    ["8", "צהריים של אמא", "אורז שעועית עם בשר בקר" ,  "img/dishes/file.png", "45","7", true],
    ["9", "אדממה", "150 גרם" ,  "img/dishes/file.png", "22","10", true]
  ]

  return (
    <div>
      <AdminTable titles={titles} rows={rows} />
    </div>
  )
}