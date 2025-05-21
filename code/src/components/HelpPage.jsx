import React, { useContext } from 'react'; // Ensure React and useContext are imported together
import '../css/HelpPage.css'
import Button from '@mui/material/Button'
import { FireWaitContext } from './FireWaitProvider'; // Import FireWait context
import PopulateData from './PopulateData'; // Import the PopulateData function


export default function HelpPage() {
  const { setShowFireWait } = useContext(FireWaitContext); // Access setShowFireWait from context

  const handlePopulateData = async () => {
      try {
        setShowFireWait(true);
        await PopulateData(); // Wait for PopulateData to finish
      } catch (error) {
        console.error('Error in PopulateData:', error); // Log any errors
      } finally {
        setShowFireWait(false); // Ensure this is called after PopulateData
      }
    } 
  

  return (

    <div className='HelpDiv' style={{ margin: '20px' }}>

      <h1>עמוד עזרה – מזנונו</h1>
      <p>
        ברוכים הבאים לעמוד העזרה של <strong>מזנונו</strong> – שירות ההזמנות הקולינרי לסטודנטים במכללה.
        השירות מאפשר הזמנה של מנות ישירות לכיתות או באיסוף עצמי (טייקאווי) – דרך אתר המכללה בצורה מהירה, נוחה וללא המתנה בתור.
      </p>

      <h3 className='title'>📝 רישום לשירות</h3>
      <p>
        כדי להשתמש בשירות "מזנונו", יש לבצע רישום חד-פעמי דרך אתר המכללה:
        <br />1. היכנסו לאזור האישי באתר המכללה.
        <br />2. לחצו על כפתור <strong>"שירות מזנונו"</strong> בתפריט הראשי.
        <br />3. מלאו את פרטיכם: שם מלא, טלפון נייד, כיתה קבועה וסוג תשלום מועדף.
        <br />4. אשרו את תנאי השימוש והשלימו את הרישום.
      </p>
      <p><strong>🛑 השימוש בשירות זמין רק לסטודנטים ואנשי סגל בעלי חשבון פעיל במערכת.</strong></p>

      <h3 className='title'>🍽️ הזמנת משלוח לכיתה</h3>
      <p>
        1. התחברו לשירות "מזנונו" באזור האישי באתר.
        <br />2. בחרו מנה מהתפריט היומי או השבועי.
        <br />3. סמנו את אפשרות <strong>"משלוח לכיתה"</strong>.
        <br />4. בחרו את הבניין והכיתה (לדוגמה: בניין ג', חדר 104).
        <br />5. אשרו את ההזמנה ובצעו תשלום מקוון.
        <br />6. ההזמנה תגיע אליכם תוך כ-20–30 דקות (בהתאם לעומס).
      </p>
      <p><strong>💡 ניתן לראות את סטטוס ההזמנה באזור "ההזמנות שלי".</strong></p>

      <h3 className='title'>👜 הזמנת טייקאווי (איסוף עצמי)</h3>
      <p>
        1. בחרו את המנה הרצויה מתוך התפריט באתר.
        <br />2. סמנו <strong>"איסוף עצמי"</strong>.
        <br />3. אשרו ובצעו תשלום.
        <br />4. תקבלו זמן מוערך לאיסוף דרך הודעה באתר.
        <br />5. הגיעו לעמדת "מזנונו" במתחם הקפיטריה והציגו את מספר ההזמנה.
      </p>
      <p><strong>⏱️ יש לאסוף את ההזמנה תוך 30 דקות ממועד המוכנות.</strong></p>

      <h3 className='title'>❌ ביטול הזמנה</h3>
      <p>
        ביטול הזמנה יתבצע דרך האזור האישי באתר:
        <br />1. היכנסו ל<strong>"ההזמנות שלי"</strong>.
        <br />2. לחצו על ההזמנה שברצונכם לבטל.
        <br />3. לחצו על כפתור <strong>"בטל הזמנה"</strong>.
        <br />4. אם ההזמנה טרם הועברה להכנה – הביטול יאושר ויופק החזר אוטומטי.
        <br />5. לאחר תחילת הכנה או יציאה למשלוח – לא ניתן לבטל את ההזמנה.
      </p>

      <h3 className='title'>💬 צרו קשר</h3>
      <p>
        שאלות, בעיות או בקשות מיוחדות? אנחנו זמינים לעזור:
        <br />- מייל שירות: <a href="mailto:support@maznono.ac.il">support@maznono.ac.il</a>
        <br />- טלפון המזנון: 03-0000000
        <br />- שעות פעילות: ימים א'-ה' 08:00–17:00
      </p>
      <div className="toolbox">
        <Button
          variant="contained"
          onClick={handlePopulateData}      
          style={{ backgroundColor: '#4CAF50', color: 'white' }}
        >
          הוסף מידע ראשוני 
        </Button>
      </div>

    </div>
  )
}