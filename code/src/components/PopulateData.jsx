import { useEffect } from 'react';
import { fireWriteCollection } from '../firebase'; // Import Firestore functions

export default function PopulateData() {
    const students = [
        { id: "314826375", name: "אורי לוי", class: "101", enabled: true },
        { id: "208764932", name: "מאיה כהן", class: "102", enabled: true },
        { id: "325189746", name: "דניאל ישראלי", class: "103", enabled: false },
        { id: "257469831", name: "תמר אוחיון", class: "104", enabled: true },
        { id: "319842657", name: "יוסי מזרחי", class: "105", enabled: true },
        { id: "294178365", name: "נועה רוזן", class: "106", enabled: false },
        { id: "284765193", name: "אדם גולן", class: "107", enabled: true },
        { id: "318945672", name: "שירה ברק", class: "108", enabled: true },
        { id: "307159826", name: "עומרי אברמוב", class: "109", enabled: false },
        { id: "316284795", name: "ליהי פרץ", class: "110", enabled: true },
        { id: "267138942", name: "דוד ממן", class: "111", enabled: true },
        { id: "298176453", name: "טל בן דוד", class: "112", enabled: true },
        { id: "243189756", name: "גיא שושן", class: "113", enabled: true },
        { id: "321764589", name: "רוני אלבז", class: "114", enabled: true },
        { id: "305798421", name: "עמית עזר", class: "115", enabled: false },
        { id: "289174635", name: "יעל אבידן", class: "116", enabled: true },
        { id: "312984657", name: "מתן נעים", class: "117", enabled: false },
        { id: "253798426", name: "ליאל סבג", class: "118", enabled: true },
        { id: "295786213", name: "נוי אזולאי", class: "119", enabled: true },
        { id: "308617492", name: "רון מלכה", class: "120", enabled: false },
        { id: "276543198", name: "אילנה הרוש", class: "121", enabled: true },
        { id: "299185476", name: "אורי ברדה", class: "122", enabled: true },
        { id: "318654729", name: "הילה ביטון", class: "123", enabled: false },
        { id: "296548713", name: "שחר שאול", class: "124", enabled: true },
        { id: "302198435", name: "תום רון", class: "125", enabled: true },
        { id: "277849315", name: "אביתר גבאי", class: "126", enabled: false },
        { id: "259741683", name: "לילך סבן", class: "127", enabled: true },
        { id: "317654892", name: "אביתר צרפתי", class: "128", enabled: true },
        { id: "298745213", name: "אלינור דיין", class: "129", enabled: true },
        { id: "286198472", name: "גל טביב", class: "130", enabled: false }
      ];
      
    // Map the students to match the new schema
    const mappedStudents = students.map((student) => ({
        "מספר סטודנט": student.id,
        "שם סטודנט": student.name,
        "כיתה קבועה": student.class,
        "פעיל": student.enabled,
    }));
    // Sample data for dishes
    const dishes = [
        { id: "1", name: "סלט", desc: "סלט טרי קצוץ", price: "25", time: "10", enabled: true },
        { id: "2", name: "לחם המכללה", desc: "מאפה ומתבלים", price: "13", time: "10", enabled: true },
        { id: "3", name: "לחמניה ללא גלוטן", desc: "מאפה ללא גלוטן", price: "13", time: "2", enabled: true },
        { id: "4", name: "צ׳יפס", desc: "צ׳יפס תפוח אדמה", price: "17", time: "10", enabled: true },
        { id: "5", name: "המבורגר", desc: "בקר 200 גרם", price: "55", time: "12", enabled: true },
        { id: "6", name: "פסטה פומודורו", desc: "פסטה ברוטב עגבניות", price: "45", time: "7", enabled: true },
        { id: "7", name: "פיצה אישית", desc: "רטוב עגבניות, מוצרלה וזיתים", price: "25", time: "10", enabled: true },
        { id: "8", name: "צהריים של אמא", desc: "אורז שעועית עם בשר בקר", price: "45", time: "7", enabled: true },
        { id: "9", name: "אדממה", desc: "150 גרם", price: "22", time: "10", enabled: true },
        { id: "10", name: "שקשוקה", desc: "ביצה בעגבניות", price: "28", time: "8", enabled: true },
        { id: "11", name: "מרק עדשים", desc: "מרק חם עם ירקות", price: "32", time: "10", enabled: true },
        { id: "12", name: "קציצות ירק", desc: "קציצות אפויות", price: "35", time: "12", enabled: true },
        { id: "13", name: "פיתה עם חומוס", desc: "פיתה עם ממרח חומוס", price: "18", time: "5", enabled: true },
        { id: "14", name: "המבורגר", desc: "200 גרם בקר", price: "55", time: "15", enabled: true },
        { id: "15", name: "שווארמה צמחונית", desc: "שווארמה מסייטן", price: "42", time: "9", enabled: true },
        { id: "16", name: "חביתה ירוקה", desc: "חביתה עם תרד", price: "22", time: "6", enabled: true },
        { id: "17", name: "טוסט גבינה", desc: "לחם עם גבינה צהובה", price: "20", time: "4", enabled: true },
        { id: "18", name: "מג'דרה", desc: "אורז עם עדשים", price: "30", time: "11", enabled: true },
        { id: "19", name: "פסטה שמנת", desc: "פסטה ברוטב שמנת", price: "47", time: "13", enabled: true },
        { id: "20", name: "בורקס גבינה", desc: "מאפה גבינה", price: "17", time: "7", enabled: true },
        { id: "21", name: "קוסקוס", desc: "קוסקוס עם ירקות", price: "38", time: "10", enabled: true },
        { id: "22", name: "מאפה תפוחי אדמה", desc: "מאפה בתנור", price: "27", time: "9", enabled: true },
        { id: "23", name: "כריך טונה", desc: "לחם מלא עם טונה", price: "29", time: "6", enabled: true },
        { id: "24", name: "חצילים בטחינה", desc: "צלויים עם טחינה", price: "25", time: "8", enabled: true },
        { id: "25", name: "עוגת שוקולד", desc: "קינוח מתוק", price: "23", time: "4", enabled: true },
        { id: "26", name: "באגט אבוקדו", desc: "באגט עם ממרח", price: "31", time: "7", enabled: true },
        { id: "27", name: "טאקו ירקות", desc: "מנה מקסיקנית", price: "40", time: "10", enabled: true },
        { id: "28", name: "פסטה פסטו", desc: "פסטה עם בזיליקום", price: "44", time: "11", enabled: true },
        { id: "29", name: "לביבות תפוחי אדמה", desc: "מטוגנות בשמן", price: "36", time: "10", enabled: true }
    ];


    const classes = [
        { id: '101', Name: 'צפון', Description: 'כיתה רגילה', Enabled: true },
        { id: '102', Name: 'דרום', Description: 'כיתה רגילה', Enabled: true },
        { id: '103', Name: 'מעבדת סייבר', Description: 'מעבדה', Enabled: false },
        { id: '104', Name: 'ספריה', Description: 'שיתופי כללי', Enabled: false },
        { id: '105', Name: 'מזרח', Description: 'כיתה רגילה', Enabled: true },
        { id: '106', Name: 'מערב', Description: 'כיתה רגילה', Enabled: true },
        { id: '107', Name: 'קומה עליונה', Description: 'שיתופי', Enabled: false },
        { id: '108', Name: 'כיתה ירוקה', Description: 'מעבדה', Enabled: true },
        { id: '109', Name: 'אודיטוריום', Description: 'שיתופי כללי', Enabled: false },
        { id: '110', Name: 'חדר מורים', Description: 'שיתופי', Enabled: false },
        { id: '111', Name: 'קפיטריה', Description: 'שיתופי כללי', Enabled: false },
        { id: '112', Name: 'מעבדת מחשבים', Description: 'מעבדה', Enabled: true },
        { id: '113', Name: 'כיתה 1', Description: 'כיתה רגילה', Enabled: true },
        { id: '114', Name: 'כיתה 2', Description: 'כיתה רגילה', Enabled: true },
        { id: '115', Name: 'כיתה 3', Description: 'כיתה רגילה', Enabled: true },
        { id: '116', Name: 'מעבדת פיזיקה', Description: 'מעבדה', Enabled: false },
        { id: '117', Name: 'מעבדת כימיה', Description: 'מעבדה', Enabled: false },
        { id: '118', Name: 'סטודיו אמנות', Description: 'מעבדה יצירתית', Enabled: true },
        { id: '119', Name: 'חדר מוזיקה', Description: 'שיתופי כללי', Enabled: true },
        { id: '120', Name: 'מעבדת רובוטיקה', Description: 'מעבדה', Enabled: true },
        { id: '121', Name: 'כיתת אנגלית', Description: 'כיתה רגילה', Enabled: true },
        { id: '122', Name: 'כיתת מתמטיקה', Description: 'כיתה רגילה', Enabled: true },
        { id: '123', Name: 'כיתת היסטוריה', Description: 'כיתה רגילה', Enabled: true },
        { id: '124', Name: 'מעבדת ביולוגיה', Description: 'מעבדה', Enabled: true },
        { id: '125', Name: 'מרכז חדשנות', Description: 'שיתופי', Enabled: false },
        { id: '126', Name: 'חדר סגל', Description: 'שיתופי', Enabled: false },
        { id: '127', Name: 'משרד מנהל', Description: 'שיתופי כללי', Enabled: false },
        { id: '128', Name: 'מעבדת תכנות', Description: 'מעבדה', Enabled: true },
        { id: '129', Name: 'מרכז למידה', Description: 'שיתופי כללי', Enabled: true },
        { id: '130', Name: 'חדר הקרנה', Description: 'שיתופי', Enabled: false },
    ];

    const orders = [
        { id: "1877", name: "מאיה כהן", delivery: false, prepTime: "20 דקות", class: "116", totalPrice: "68", quantity: "2",  orderNumber: "1877" },
        { id: "1631", name: "אדם גולן", delivery: false, prepTime: "10 דקות", class: "125", totalPrice: "44", quantity: "2",  orderNumber: "1631" },
        { id: "1689", name: "דוד ממן", delivery: false, prepTime: "15 דקות", class: "114", totalPrice: "26", quantity: "1",  orderNumber: "1689" },
        { id: "1601", name: "שירה ברק", delivery: false, prepTime: "25 דקות", class: "101", totalPrice: "90", quantity: "3",  orderNumber: "1601" },
        { id: "1805", name: "אורי ברדה", delivery: true, prepTime: "15 דקות", class: "121", totalPrice: "81", quantity: "3",  orderNumber: "1805" },
        { id: "1967", name: "שירה ברק", delivery: true, prepTime: "25 דקות", class: "105", totalPrice: "87", quantity: "3",  orderNumber: "1967" },
        { id: "1741", name: "אלינור דיין", delivery: true, prepTime: "30 דקות", class: "111", totalPrice: "30", quantity: "1",  orderNumber: "1741" },
        { id: "1949", name: "עמית עזר", delivery: true, prepTime: "35 דקות", class: "106", totalPrice: "64", quantity: "4",  orderNumber: "1949" },
        { id: "1892", name: "גיא שושן", delivery: false, prepTime: "25 דקות", class: "109", totalPrice: "125", quantity: "5",  orderNumber: "1892" },
        { id: "1884", name: "עמית עזר", delivery: false, prepTime: "20 דקות", class: "129", totalPrice: "84", quantity: "4",  orderNumber: "1884" },
        { id: "1850", name: "תמר אוחיון", delivery: false, prepTime: "30 דקות", class: "110", totalPrice: "26", quantity: "1",  orderNumber: "1850" },
        { id: "1668", name: "ליהי פרץ", delivery: true, prepTime: "35 דקות", class: "103", totalPrice: "30", quantity: "1",  orderNumber: "1668" },
        { id: "1857", name: "גיא שושן", delivery: false, prepTime: "15 דקות", class: "106", totalPrice: "105", quantity: "3",  orderNumber: "1857" },
        { id: "1863", name: "אורי ברדה", delivery: false, prepTime: "20 דקות", class: "111", totalPrice: "90", quantity: "3",  orderNumber: "1863" },
        { id: "1939", name: "גל טביב", delivery: false, prepTime: "25 דקות", class: "101", totalPrice: "36", quantity: "2",  orderNumber: "1939" },
        { id: "1800", name: "תמר אוחיון", delivery: true, prepTime: "10 דקות", class: "126", totalPrice: "60", quantity: "3",  orderNumber: "1800" },
        { id: "1664", name: "רון מלכה", delivery: false, prepTime: "20 דקות", class: "106", totalPrice: "100", quantity: "5",  orderNumber: "1664" },
        { id: "1690", name: "יעל אבידן", delivery: true, prepTime: "15 דקות", class: "126", totalPrice: "96", quantity: "3",  orderNumber: "1690" },
        { id: "1837", name: "שחר שאול", delivery: true, prepTime: "35 דקות", class: "121", totalPrice: "132", quantity: "4",  orderNumber: "1837" },
        { id: "1810", name: "תום רון", delivery: false, prepTime: "25 דקות", class: "103", totalPrice: "60", quantity: "2",  orderNumber: "1810" },
        { id: "1981", name: "הילה ביטון", delivery: true, prepTime: "10 דקות", class: "128", totalPrice: "120", quantity: "4",  orderNumber: "1981" },
        { id: "1726", name: "אילנה הרוש", delivery: false, prepTime: "15 דקות", class: "111", totalPrice: "15", quantity: "1",  orderNumber: "1726" },
        { id: "1995", name: "יוסי מזרחי", delivery: false, prepTime: "30 דקות", class: "115", totalPrice: "81", quantity: "3",  orderNumber: "1995" },
        { id: "1731", name: "גל טביב", delivery: true, prepTime: "10 דקות", class: "130", totalPrice: "22", quantity: "1",  orderNumber: "1731" },
        { id: "1610", name: "לילך סבן", delivery: true, prepTime: "15 דקות", class: "121", totalPrice: "116", quantity: "4",  orderNumber: "1610" },
        { id: "1775", name: "אדם גולן", delivery: false, prepTime: "20 דקות", class: "102", totalPrice: "21", quantity: "1",  orderNumber: "1775" },
        { id: "1925", name: "מתן נעים", delivery: true, prepTime: "15 דקות", class: "121", totalPrice: "60", quantity: "3",  orderNumber: "1925" },
        { id: "1606", name: "גיא שושן", delivery: true, prepTime: "35 דקות", class: "113", totalPrice: "120", quantity: "4",  orderNumber: "1606" },
        { id: "1853", name: "הילה ביטון", delivery: false, prepTime: "35 דקות", class: "106", totalPrice: "44", quantity: "2",  orderNumber: "1853" },
        { id: "1963", name: "אלינור דיין", delivery: false, prepTime: "25 דקות", class: "116", totalPrice: "57", quantity: "3",  orderNumber: "1963" },
        { id: "1849", name: "עמית עזר", delivery: true, prepTime: "20 דקות", class: "114", totalPrice: "145", quantity: "5",  orderNumber: "1849" },
        { id: "1839", name: "אורי ברדה", delivery: true, prepTime: "10 דקות", class: "121", totalPrice: "48", quantity: "2",  orderNumber: "1839" },
        { id: "1672", name: "אביתר גבאי", delivery: false, prepTime: "35 דקות", class: "109", totalPrice: "100", quantity: "4",  orderNumber: "1672" },
        { id: "1771", name: "תמר אוחיון", delivery: false, prepTime: "35 דקות", class: "116", totalPrice: "140", quantity: "4",  orderNumber: "1771" },
        { id: "1814", name: "גל טביב", delivery: true, prepTime: "30 דקות", class: "115", totalPrice: "90", quantity: "5",  orderNumber: "1814" },
        { id: "1944", name: "רון מלכה", delivery: false, prepTime: "20 דקות", class: "107", totalPrice: "95", quantity: "5",  orderNumber: "1944" },
        { id: "1633", name: "יוסי מזרחי", delivery: false, prepTime: "25 דקות", class: "104", totalPrice: "87", quantity: "3",  orderNumber: "1633" },
        { id: "1659", name: "טל בן דוד", delivery: false, prepTime: "25 דקות", class: "116", totalPrice: "78", quantity: "3",  orderNumber: "1659" },
        { id: "1833", name: "שחר שאול", delivery: true, prepTime: "15 דקות", class: "125", totalPrice: "51", quantity: "3",  orderNumber: "1833" },
        { id: "1685", name: "אדם גולן", delivery: true, prepTime: "25 דקות", class: "113", totalPrice: "70", quantity: "2",  orderNumber: "1685" },
        { id: "1749", name: "מאיה כהן", delivery: true, prepTime: "10 דקות", class: "115", totalPrice: "124", quantity: "4",  orderNumber: "1749" },
        { id: "1825", name: "לילך סבן", delivery: true, prepTime: "25 דקות", class: "113", totalPrice: "40", quantity: "2",  orderNumber: "1825" },
        { id: "1625", name: "שירה ברק", delivery: false, prepTime: "30 דקות", class: "124", totalPrice: "99", quantity: "3",  orderNumber: "1625" },
        { id: "1993", name: "עמית עזר", delivery: false, prepTime: "35 דקות", class: "129", totalPrice: "99", quantity: "3",  orderNumber: "1993" },
        { id: "1942", name: "יוסי מזרחי", delivery: true, prepTime: "15 דקות", class: "111", totalPrice: "160", quantity: "5",  orderNumber: "1942" },
        { id: "1816", name: "יוסי מזרחי", delivery: false, prepTime: "15 דקות", class: "110", totalPrice: "62", quantity: "2",  orderNumber: "1816" },
        { id: "1718", name: "דניאל ישראלי", delivery: true, prepTime: "20 דקות", class: "111", totalPrice: "130", quantity: "5",  orderNumber: "1718" },
        { id: "1794", name: "דוד ממן", delivery: false, prepTime: "35 דקות", class: "119", totalPrice: "31", quantity: "1",  orderNumber: "1794" },
        { id: "1784", name: "טל בן דוד", delivery: false, prepTime: "20 דקות", class: "129", totalPrice: "44", quantity: "2",  orderNumber: "1784" },
        { id: "1862", name: "אלינור דיין", delivery: true, prepTime: "20 דקות", class: "125", totalPrice: "75", quantity: "5",  orderNumber: "1862" }
      ];
      
// Map the orders to match the new schema
    const mappedOrders = orders.map((order) => ({
        "id": order.id,
        "שם סטודנט מזמין": order.name,
        "משלוח": order.delivery,
        "זמן הכנה כולל": order.prepTime,
        "מספר כיתה": order.class,
        "מחיר כולל": order.totalPrice,
        "כמות מנות": order.quantity,
        "מספר הזמנה": order.orderNumber
      }));
      
    // Map the dishes to match the new schema
    const mappedDishes = dishes.map((dish) => ({
        "מספר מנה": dish.id,
        "שם המנה": dish.name,
        "תיאור המנה": dish.desc,
        "מחיר": dish.price,
        "זמן הכנה": dish.time,
        "פעיל": dish.Enabled,

    }));

    // Map the classes to match the new schema
    const mappedClasses = classes.map((cls) => ({
        "מספר כיתה": cls.id,
        "שם כיתה": cls.Name,
        "תיאור": cls.Description,
        "פעיל": cls.Enabled,
    }));

    const dataTables = ["dishes", "classes", "students", "orders"];
    const mappedData = {
        dishes: mappedDishes,
        classes: mappedClasses,
        students: mappedStudents,
        orders: mappedOrders,
    };

    useEffect(() => {
        dataTables.forEach((table) => {
            fireWriteCollection(table, mappedData[table]) // Dynamically reference the correct mapped data
                .then(() => {
                    console.log(`${table} have been populated successfully!`);
                })
                .catch((error) => {
                    console.error(`Error populating ${table}:`, error);
                });
        });
    }, []);

    return (
        <div>
            <h1>Populate Data</h1>
            <p>Data for dishes, classes, and students has been populated in the Firestore database.</p>
        </div>
    );
}
