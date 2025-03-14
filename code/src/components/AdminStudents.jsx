import 'react'
import AdminTable from './AdminTable'

export default function AdminStudents() {
  const titles = ["מספר סטודנט", "שם פרטי", "שם משפחה"]
  const rows = [
    ["39161", "סהר", "ברק"],
    ["13062", "תמר", "מזרחי"],
    ["47128", "יעל", "שחר"],
    ["47716", "ליאור", "שפירא"],
    ["33396", "דניאל", "מזרחי"],
    ["67489", "יעל", "רוזנברג"],
    ["80134", "שירה", "לוי"],
    ["60528", "איתי", "רוזנברג"],
    ["72371", "איתי", "פרץ"],
    ["36499", "אורי", "ברק"]
  ]

  return (
    <div>
      <AdminTable titles={titles} rows={rows} />
    </div>
  )
}

