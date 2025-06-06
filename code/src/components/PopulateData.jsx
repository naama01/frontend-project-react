import { fireWriteCollection } from '../firebase'; // Import Firestore functions


export default function PopulateData() {

    function getRandomDate() {
        const start = new Date();
        start.setFullYear(start.getFullYear() - 1); // Set the start date to one year ago
        const end = new Date(); // Current date
        const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return randomDate.toLocaleString("en-US"); // Format the date as "5/17/2025, 7:11:08 PM"
    }

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
    const mappedStudents = students.map((student) => ({
        "מספר סטודנט": student.id,
        "שם סטודנט": student.name,
        "כיתה קבועה": student.class,
        "מייל": student.email,
        "טלפון": student.phone,
        "פעיל": student.enabled,
    }));

    const dishes = [
        { id: "1", name: "סלט", desc: "סלט ירקות טרי, קצוץ דק ומרענן – פשוט מושלם ליד כל מנה", rate: "4", price: "25", time: "10", enabled: true },
        { id: "2", name: "לחם המכללה", desc: "לחם חם מהתנור עם מטבלים עשירים – מושלם לנשנוש או התחלה", rate: "4.5", price: "13", time: "10", enabled: true },
        { id: "3", name: "לחמניה ללא גלוטן", desc: "לחמנייה טרייה ורכה – ללא גלוטן וללא פשרות בטעם", rate: "2", price: "13", time: "2", enabled: true },
        { id: "4", name: "צ׳יפס", desc: "צ'יפס פריך, זהוב ומלוח בדיוק במידה – פינוק קלאסי", rate: "4", price: "17", time: "10", enabled: true },
        { id: "5", name: "המבורגר", desc: "המבורגר בקר עסיסי 200 גרם – עשוי במידת העשייה המושלמת", rate: "4.5", price: "55", time: "12", enabled: true },
        { id: "6", name: "המבורגר טלה", desc: "המבורגר בקר איכותי 200 גרם – עסיסי ומשביע בכל ביס", rate: "5", price: "55", time: "15", enabled: true },
        { id: "7", name: "פיצה אישית", desc: "פיצה טרייה עם עגבניות, גבינת מוצרלה ונגיעת זיתים – מושלמת בכל ביס", rate: "4", price: "25", time: "10", enabled: true },
        { id: "8", name: "צהריים של אמא", desc: "אורז, שעועית ובקר בבישול ביתי – ממש כמו של אמא", rate: "5", price: "45", time: "7", enabled: true },
        { id: "9", name: "אדממה", desc: "מנת אדממה חמה עם מלח גס – קלילה ומושלמת ליד כל ארוחה", rate: "3", price: "22", time: "10", enabled: true },
        { id: "10", name: "שקשוקה", desc: "שקשוקה לוהטת עם ביצה רכה ברוטב עגבניות ביתי", rate: "3.5", price: "28", time: "8", enabled: true },
        { id: "11", name: "מרק עדשים", desc: "מרק עשיר, חמים ומזין עם עדשים וירקות טריים", rate: "2", price: "32", time: "10", enabled: true },
        { id: "12", name: "קציצות ירק", desc: "קציצות אפויות מירקות טריים – פריכות מבחוץ ורכות מבפנים", rate: "2", price: "35", time: "12", enabled: true },
        { id: "13", name: "פיתה עם חומוס", desc: "פיתה טרייה עם ממרח חומוס חלק, מושלם לנשנוש קל", rate: "3", price: "18", time: "5", enabled: true },
        { id: "14", name: "פסטה פומודורו", desc: "פסטה איטלקית ברוטב עגבניות קלאסי – חמימה ומנחמת", rate: "4.5", price: "45", time: "7", enabled: true },
        { id: "15", name: "שווארמה צמחונית", desc: "שווארמה טבעונית מסייטן, מתובלת ומוגשת בפיתה חמה", rate: "0.5", price: "42", time: "9", enabled: true },
        { id: "16", name: "חביתה ירוקה", desc: "חביתה אוורירית עם עלי תרד טריים – טעימה ובריאה", rate: "4", price: "22", time: "6", enabled: true },
        { id: "17", name: "טוסט גבינה", desc: "טוסט חם ופריך עם גבינה נמסה בלחם טרי", rate: "3", price: "20", time: "4", enabled: true },
        { id: "18", name: "מג'דרה", desc: "תבשיל מג'דרה מסורתי עם אורז ועדשים – טעם של בית", rate: "3", price: "30", time: "11", enabled: true },
        { id: "19", name: "פסטה שמנת", desc: "פסטה חמה ברוטב שמנת עשיר וקטיפתי – תענוג אמיתי", rate: "4", price: "47", time: "13", enabled: true },
        { id: "20", name: "בורקס גבינה", desc: "בורקס גבינה פריך וזהוב – מושלם ליד סלט או כקינוח מלוח", rate: "3.5", price: "17", time: "7", enabled: true },
        { id: "21", name: "קוסקוס", desc: "קוסקוס מסורתי עם ירקות מבושלים היטב – מנה מנחמת ומשביעה", rate: "3", price: "38", time: "10", enabled: true },
        { id: "22", name: "מאפה תפוחי אדמה", desc: "מאפה תפוחי אדמה חם מהתנור – טעם ביתי בכל ביס", rate: "3", price: "27", time: "9", enabled: true },
        { id: "23", name: "כריך טונה", desc: "כריך בלחם מלא עם סלט טונה טרי ומרענן", rate: "4", price: "29", time: "6", enabled: true },
        { id: "24", name: "חצילים בטחינה", desc: "חצילים קלויים עם טחינה עשירה – קלאסיקה ים תיכונית שתמיד כיף לאכול", rate: "4", price: "25", time: "8", enabled: true },
        { id: "25", name: "עוגת שוקולד", desc: "עוגת שוקולד עשירה ונימוחה – הסיום המתוק המושלם לארוחה", rate: "3", price: "23", time: "4", enabled: true },
        { id: "26", name: "באגט אבוקדו", desc: "באגט טרי עם ממרח אבוקדו מתובל – בריא, טעים ומרענן", rate: "1", price: "31", time: "7", enabled: true },
        { id: "27", name: "טאקו ירקות", desc: "טאקו מקסיקני פריך במילוי ירקות טריים ורוטב פיקנטי", rate: "1", price: "40", time: "10", enabled: true },
        { id: "28", name: "פסטה פסטו", desc: "פסטה איטלקית עם רוטב פסטו מבזיליקום טרי – קלילה וטעימה", rate: "0.5", price: "44", time: "11", enabled: true },
        { id: "29", name: "לביבות תפוחי אדמה", desc: "לביבות קריספיות מבחוץ ורכות מבפנים – טעם של בית", rate: "2.5", price: "36", time: "10", enabled: true },
        { id: "30", name: "סושי", desc: "שני רולים לבחירה – טריים, צבעוניים ומוכנים במקום", rate: "4.5", price: "46", time: "15", enabled: true }
    ];
    const mappedDishes = dishes.map((dish) => ({
        "מספר מנה": dish.id,
        "שם המנה": dish.name,
        "תיאור המנה": dish.desc,
        "מחיר": dish.price,
        "זמן הכנה": dish.time,
        "דירוג": dish.rate,
        "פעיל": dish.enabled,

    }));


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
    const mappedClasses = classes.map((cls) => ({
        "מספר כיתה": cls.id,
        "שם כיתה": cls.Name,
        "תיאור": cls.Description,
        "פעיל": cls.Enabled,
    }));

    const orders = [
        { id: "10000", studentId: "286198472", delivery: true, class: "113", totalPrice: "44", quantity: "3", orderNumber: "1800", date: getRandomDate() },
        { id: "10001", studentId: "312984657", delivery: true, class: "109", totalPrice: "30", quantity: "4", orderNumber: "1801", date: getRandomDate() },
        { id: "10002", studentId: "318945672", delivery: false, class: "102", totalPrice: "75", quantity: "3", orderNumber: "1802", date: getRandomDate() },
        { id: "10003", studentId: "308617492", delivery: false, class: "114", totalPrice: "90", quantity: "1", orderNumber: "1803", date: getRandomDate() },
        { id: "10004", studentId: "316284795", delivery: false, class: "103", totalPrice: "30", quantity: "3", orderNumber: "1804", date: getRandomDate() },
        { id: "10005", studentId: "319842657", delivery: true, class: "121", totalPrice: "44", quantity: "3", orderNumber: "1805", date: getRandomDate() },
        { id: "10006", studentId: "284765193", delivery: true, class: "105", totalPrice: "68", quantity: "1", orderNumber: "1806", date: getRandomDate() },
        { id: "10007", studentId: "243189756", delivery: false, class: "128", totalPrice: "84", quantity: "2", orderNumber: "1807", date: getRandomDate() },
        { id: "10008", studentId: "267138942", delivery: true, class: "107", totalPrice: "57", quantity: "5", orderNumber: "1808", date: getRandomDate() },
        { id: "10009", studentId: "302198435", delivery: false, class: "117", totalPrice: "20", quantity: "4", orderNumber: "1809", date: getRandomDate() },
        { id: "10010", studentId: "257469831", delivery: false, class: "119", totalPrice: "105", quantity: "4", orderNumber: "1810", date: getRandomDate() },
        { id: "10011", studentId: "305798421", delivery: false, class: "101", totalPrice: "90", quantity: "2", orderNumber: "1811", date: getRandomDate() },
        { id: "10012", studentId: "259741683", delivery: true, class: "113", totalPrice: "120", quantity: "3", orderNumber: "1812", date: getRandomDate() },
        { id: "10013", studentId: "208764932", delivery: true, class: "110", totalPrice: "68", quantity: "2", orderNumber: "1813", date: getRandomDate() },
        { id: "10014", studentId: "318654729", delivery: true, class: "106", totalPrice: "30", quantity: "5", orderNumber: "1814", date: getRandomDate() },
        { id: "10015", studentId: "243189756", delivery: true, class: "124", totalPrice: "57", quantity: "2", orderNumber: "1815", date: getRandomDate() },
        { id: "10016", studentId: "276543198", delivery: false, class: "125", totalPrice: "105", quantity: "4", orderNumber: "1816", date: getRandomDate() },
        { id: "10017", studentId: "253798426", delivery: false, class: "121", totalPrice: "30", quantity: "3", orderNumber: "1817", date: getRandomDate() },
        { id: "10018", studentId: "298176453", delivery: false, class: "116", totalPrice: "44", quantity: "2", orderNumber: "1818", date: getRandomDate() },
        { id: "10019", studentId: "299185476", delivery: false, class: "130", totalPrice: "20", quantity: "1", orderNumber: "1819", date: getRandomDate() },
        { id: "10020", studentId: "243189756", delivery: true, class: "104", totalPrice: "44", quantity: "2", orderNumber: "1820", date: getRandomDate() },
        { id: "10021", studentId: "243189756", delivery: false, class: "119", totalPrice: "105", quantity: "1", orderNumber: "1821", date: getRandomDate() },
        { id: "10022", studentId: "294178365", delivery: false, class: "111", totalPrice: "57", quantity: "3", orderNumber: "1822", date: getRandomDate() },
        { id: "10023", studentId: "312984657", delivery: false, class: "108", totalPrice: "120", quantity: "5", orderNumber: "1823", date: getRandomDate() },
        { id: "10024", studentId: "298745213", delivery: false, class: "121", totalPrice: "20", quantity: "2", orderNumber: "1824", date: getRandomDate() },
        { id: "10025", studentId: "286198472", delivery: false, class: "111", totalPrice: "84", quantity: "3", orderNumber: "1825", date: getRandomDate() },
        { id: "10026", studentId: "259741683", delivery: false, class: "104", totalPrice: "30", quantity: "1", orderNumber: "1826", date: getRandomDate() },
        { id: "10027", studentId: "267138942", delivery: true, class: "115", totalPrice: "44", quantity: "4", orderNumber: "1827", date: getRandomDate() },
        { id: "10028", studentId: "284765193", delivery: false, class: "120", totalPrice: "68", quantity: "4", orderNumber: "1828", date: getRandomDate() },
        { id: "10029", studentId: "312984657", delivery: false, class: "109", totalPrice: "84", quantity: "1", orderNumber: "1829", date: getRandomDate() },
        { id: "10030", studentId: "298176453", delivery: true, class: "116", totalPrice: "90", quantity: "5", orderNumber: "1830", date: getRandomDate() },
    ];
    const mappedOrders = orders.map((order) => ({
        "id": order.id,
        "תז סטודנט מזמין": order.studentId,
        "משלוח": order.delivery,
        "מספר כיתה": order.class,
        "מחיר כולל": order.totalPrice,
        "כמות מנות": order.quantity,
        "מספר הזמנה": order.orderNumber,
        "תאריך": order.date, // Map the date field
    }));



    const dataTables = ["dishes", "classes", "students", "orders"];
    const mappedData = {
        dishes: mappedDishes,
        classes: mappedClasses,
        students: mappedStudents,
        orders: mappedOrders,
    };

    const promises = dataTables.map((table) => {
        return fireWriteCollection(table, mappedData[table]) // Dynamically reference the correct mapped data
            .then(() => {
                console.log(`${table} have been populated successfully!`);
            })
            .catch((error) => {
                console.error(`Error populating ${table}:`, error);
            });
    });

    return Promise.all(promises).then(() => (
        <div>
            <p>FOR DEMO: Data for {dataTables.toString()} has been populated in the Firestore database.</p>
        </div>
    ));
}
