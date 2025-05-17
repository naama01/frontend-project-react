import { useEffect } from 'react';
import { fireWriteCollection } from '../firebase'; // Import Firestore functions

export default function PopulateData() {
    const students = [
        { id: "314826375", name: "אורי לוי", class: "101", enabled: true, email: "uri.levi@example.com", phone: "0541234567" },
        { id: "208764932", name: "מאיה כהן", class: "102", enabled: true, email: "maya.cohen@example.com", phone: "0509876543" },
        { id: "325189746", name: "דניאל ישראלי", class: "103", enabled: false, email: "daniel.israeli@example.com", phone: "0527654321" },
        { id: "257469831", name: "תמר אוחיון", class: "104", enabled: true, email: "tamar.ohayon@example.com", phone: "0545678912" },
        { id: "319842657", name: "יוסי מזרחי", class: "105", enabled: true, email: "yossi.mizrahi@example.com", phone: "0501239876" },
        { id: "294178365", name: "נועה רוזן", class: "106", enabled: false, email: "noa.rozen@example.com", phone: "0523478910" },
        { id: "284765193", name: "אדם גולן", class: "107", enabled: true, email: "adam.golan@example.com", phone: "0505678912" },
        { id: "318945672", name: "שירה ברק", class: "108", enabled: true, email: "shira.barak@example.com", phone: "0547891234" },
        { id: "307159826", name: "עומרי אברמוב", class: "109", enabled: false, email: "omri.avramov@example.com", phone: "0529988776" },
        { id: "316284795", name: "ליהי פרץ", class: "110", enabled: true, email: "lihi.peretz@example.com", phone: "0504455667" },
        { id: "267138942", name: "דוד ממן", class: "111", enabled: true, email: "david.maman@example.com", phone: "0543344556" },
        { id: "298176453", name: "טל בן דוד", class: "112", enabled: true, email: "tal.bendavid@example.com", phone: "0527788990" },
        { id: "243189756", name: "גיא שושן", class: "113", enabled: true, email: "guy.shoshan@example.com", phone: "0502244668" },
        { id: "321764589", name: "רוני אלבז", class: "114", enabled: true, email: "roni.elbaz@example.com", phone: "0545566778" },
        { id: "305798421", name: "עמית עזר", class: "115", enabled: false, email: "amit.ezer@example.com", phone: "0521122334" },
        { id: "289174635", name: "יעל אבידן", class: "116", enabled: true, email: "yael.avidan@example.com", phone: "0509988776" },
        { id: "312984657", name: "מתן נעים", class: "117", enabled: false, email: "matan.naim@example.com", phone: "0542211334" },
        { id: "253798426", name: "ליאל סבג", class: "118", enabled: true, email: "liel.sabag@example.com", phone: "0501234432" },
        { id: "295786213", name: "נוי אזולאי", class: "119", enabled: true, email: "noy.azoulay@example.com", phone: "0527788001" },
        { id: "308617492", name: "רון מלכה", class: "120", enabled: false, email: "ron.malka@example.com", phone: "0506655443" },
        { id: "276543198", name: "אילנה הרוש", class: "121", enabled: true, email: "ilana.harush@example.com", phone: "0549090900" },
        { id: "299185476", name: "אורי ברדה", class: "122", enabled: true, email: "uri.barda@example.com", phone: "0524443322" },
        { id: "318654729", name: "הילה ביטון", class: "123", enabled: false, email: "hila.biton@example.com", phone: "0509911882" },
        { id: "296548713", name: "שחר שאול", class: "124", enabled: true, email: "shahar.shaul@example.com", phone: "0528822110" },
        { id: "302198435", name: "תום רון", class: "125", enabled: true, email: "tom.ron@example.com", phone: "0505599443" },
        { id: "277849315", name: "אביתר גבאי", class: "126", enabled: false, email: "evyatar.gabay@example.com", phone: "0547788000" },
        { id: "259741683", name: "לילך סבן", class: "127", enabled: true, email: "lilach.saban@example.com", phone: "0501122334" },
        { id: "317654892", name: "אביתר צרפתי", class: "128", enabled: true, email: "evyatar.tzarfati@example.com", phone: "0526677889" },
        { id: "298745213", name: "אלינור דיין", class: "129", enabled: true, email: "elinor.dayan@example.com", phone: "0504433221" },
        { id: "286198472", name: "גל טביב", class: "130", enabled: false, email: "gal.tabib@example.com", phone: "0543332221" }
      ];
      
      
    // Map the students to match the new schema
    const mappedStudents = students.map((student) => ({
        "מספר סטודנט": student.id,
        "שם סטודנט": student.name,
        "כיתה קבועה": student.class,
        "מייל": student.email,
        "טלפון": student.phone,
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
        { id: "1800", studentId: "286198472", delivery: true, prepTime: "20 דקות", class: "113", totalPrice: "44", quantity: "3", orderNumber: "1800" },
        { id: "1801", studentId: "312984657", delivery: true, prepTime: "15 דקות", class: "109", totalPrice: "30", quantity: "4", orderNumber: "1801" },
        { id: "1802", studentId: "318945672", delivery: false, prepTime: "35 דקות", class: "102", totalPrice: "75", quantity: "3", orderNumber: "1802" },
        { id: "1803", studentId: "308617492", delivery: false, prepTime: "30 דקות", class: "114", totalPrice: "90", quantity: "1", orderNumber: "1803" },
        { id: "1804", studentId: "316284795", delivery: false, prepTime: "10 דקות", class: "103", totalPrice: "30", quantity: "3", orderNumber: "1804" },
        { id: "1805", studentId: "319842657", delivery: true, prepTime: "25 דקות", class: "121", totalPrice: "44", quantity: "3", orderNumber: "1805" },
        { id: "1806", studentId: "284765193", delivery: true, prepTime: "15 דקות", class: "105", totalPrice: "68", quantity: "1", orderNumber: "1806" },
        { id: "1807", studentId: "243189756", delivery: false, prepTime: "35 דקות", class: "128", totalPrice: "84", quantity: "2", orderNumber: "1807" },
        { id: "1808", studentId: "267138942", delivery: true, prepTime: "10 דקות", class: "107", totalPrice: "57", quantity: "5", orderNumber: "1808" },
        { id: "1809", studentId: "302198435", delivery: false, prepTime: "30 דקות", class: "117", totalPrice: "20", quantity: "4", orderNumber: "1809" },
        { id: "1810", studentId: "257469831", delivery: false, prepTime: "20 דקות", class: "119", totalPrice: "105", quantity: "4", orderNumber: "1810" },
        { id: "1811", studentId: "305798421", delivery: false, prepTime: "25 דקות", class: "101", totalPrice: "90", quantity: "2", orderNumber: "1811" },
        { id: "1812", studentId: "259741683", delivery: true, prepTime: "35 דקות", class: "113", totalPrice: "120", quantity: "3", orderNumber: "1812" },
        { id: "1813", studentId: "208764932", delivery: true, prepTime: "35 דקות", class: "110", totalPrice: "68", quantity: "2", orderNumber: "1813" },
        { id: "1814", studentId: "318654729", delivery: true, prepTime: "35 דקות", class: "106", totalPrice: "30", quantity: "5", orderNumber: "1814" },
        { id: "1815", studentId: "243189756", delivery: true, prepTime: "10 דקות", class: "124", totalPrice: "57", quantity: "2", orderNumber: "1815" },
        { id: "1816", studentId: "276543198", delivery: false, prepTime: "25 דקות", class: "125", totalPrice: "105", quantity: "4", orderNumber: "1816" },
        { id: "1817", studentId: "253798426", delivery: false, prepTime: "10 דקות", class: "121", totalPrice: "30", quantity: "3", orderNumber: "1817" },
        { id: "1818", studentId: "298176453", delivery: false, prepTime: "20 דקות", class: "116", totalPrice: "44", quantity: "2", orderNumber: "1818" },
        { id: "1819", studentId: "299185476", delivery: false, prepTime: "20 דקות", class: "130", totalPrice: "20", quantity: "1", orderNumber: "1819" },
        { id: "1820", studentId: "243189756", delivery: true, prepTime: "25 דקות", class: "104", totalPrice: "44", quantity: "2", orderNumber: "1820" },
        { id: "1821", studentId: "243189756", delivery: false, prepTime: "35 דקות", class: "119", totalPrice: "105", quantity: "1", orderNumber: "1821" },
        { id: "1822", studentId: "294178365", delivery: false, prepTime: "20 דקות", class: "111", totalPrice: "57", quantity: "3", orderNumber: "1822" },
        { id: "1823", studentId: "312984657", delivery: false, prepTime: "15 דקות", class: "108", totalPrice: "120", quantity: "5", orderNumber: "1823" },
        { id: "1824", studentId: "298745213", delivery: false, prepTime: "30 דקות", class: "121", totalPrice: "20", quantity: "2", orderNumber: "1824" },
        { id: "1825", studentId: "286198472", delivery: false, prepTime: "15 דקות", class: "111", totalPrice: "84", quantity: "3", orderNumber: "1825" },
        { id: "1826", studentId: "259741683", delivery: false, prepTime: "10 דקות", class: "104", totalPrice: "30", quantity: "1", orderNumber: "1826" },
        { id: "1827", studentId: "267138942", delivery: true, prepTime: "15 דקות", class: "115", totalPrice: "44", quantity: "4", orderNumber: "1827" },
        { id: "1828", studentId: "284765193", delivery: false, prepTime: "10 דקות", class: "120", totalPrice: "68", quantity: "4", orderNumber: "1828" },
        { id: "1829", studentId: "312984657", delivery: false, prepTime: "35 דקות", class: "109", totalPrice: "84", quantity: "1", orderNumber: "1829" },
        { id: "1830", studentId: "298176453", delivery: true, prepTime: "20 דקות", class: "116", totalPrice: "90", quantity: "5", orderNumber: "1830" },
        { id: "1831", studentId: "321764589", delivery: true, prepTime: "35 דקות", class: "103", totalPrice: "68", quantity: "3", orderNumber: "1831" },
        { id: "1832", studentId: "259741683", delivery: false, prepTime: "25 דקות", class: "104", totalPrice: "105", quantity: "5", orderNumber: "1832" },
        { id: "1833", studentId: "296548713", delivery: false, prepTime: "20 דקות", class: "118", totalPrice: "30", quantity: "1", orderNumber: "1833" },
        { id: "1834", studentId: "325189746", delivery: true, prepTime: "15 דקות", class: "110", totalPrice: "84", quantity: "4", orderNumber: "1834" },
        { id: "1835", studentId: "259741683", delivery: false, prepTime: "35 דקות", class: "102", totalPrice: "68", quantity: "3", orderNumber: "1835" },
        { id: "1836", studentId: "259741683", delivery: false, prepTime: "25 דקות", class: "108", totalPrice: "30", quantity: "3", orderNumber: "1836" },
        { id: "1837", studentId: "308617492", delivery: false, prepTime: "10 דקות", class: "120", totalPrice: "105", quantity: "2", orderNumber: "1837" },
        { id: "1838", studentId: "284765193", delivery: true, prepTime: "10 דקות", class: "123", totalPrice: "105", quantity: "5", orderNumber: "1838" },
        { id: "1839", studentId: "299185476", delivery: false, prepTime: "15 דקות", class: "126", totalPrice: "90", quantity: "2", orderNumber: "1839" },
        { id: "1840", studentId: "208764932", delivery: true, prepTime: "30 דקות", class: "113", totalPrice: "68", quantity: "4", orderNumber: "1840" },
        { id: "1841", studentId: "284765193", delivery: false, prepTime: "25 דקות", class: "111", totalPrice: "68", quantity: "4", orderNumber: "1841" },
        { id: "1842", studentId: "253798426", delivery: false, prepTime: "15 דקות", class: "130", totalPrice: "105", quantity: "4", orderNumber: "1842" },
        { id: "1843", studentId: "305798421", delivery: false, prepTime: "25 דקות", class: "107", totalPrice: "57", quantity: "3", orderNumber: "1843" },
        { id: "1844", studentId: "284765193", delivery: false, prepTime: "20 דקות", class: "124", totalPrice: "44", quantity: "2", orderNumber: "1844" },
        { id: "1845", studentId: "294178365", delivery: false, prepTime: "15 דקות", class: "116", totalPrice: "30", quantity: "2", orderNumber: "1845" },
        { id: "1846", studentId: "284765193", delivery: true, prepTime: "35 דקות", class: "105", totalPrice: "120", quantity: "4", orderNumber: "1846" },
        { id: "1847", studentId: "298745213", delivery: true, prepTime: "20 דקות", class: "119", totalPrice: "68", quantity: "5", orderNumber: "1847" },
        { id: "1848", studentId: "284765193", delivery: true, prepTime: "25 דקות", class: "128", totalPrice: "57", quantity: "4", orderNumber: "1848" },
        { id: "1849", studentId: "259741683", delivery: true, prepTime: "30 דקות", class: "106", totalPrice: "57", quantity: "3", orderNumber: "1849" }
      ];
            
// Map the orders to match the new schema
    const mappedOrders = orders.map((order) => ({
        "id": order.id,
        "תז סטודנט מזמין": order.studentId,
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
