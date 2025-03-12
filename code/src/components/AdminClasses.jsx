import 'react'
import AdminTable from './AdminTable'

export default function AdminClasses() {
  const titles = ["מספר חדר", "מיקום", "מותר למשלוח"]
  const rows = [
    ["101", "צפון", true],
    ["102", "צפון", true],
    ["103", "דרום", true],
    ["104", "דרום", true],
    ["201", "צפון", true],
    ["202", "צפון", true],
    ["203", "מעבדת סייבר", true],
    ["302", "צפון", true],
    ["303", "צפון", true],
    ["304", "מעבדת מחקר", true],
    ["401", "הנהלה", true],
    ["500", "גג", true]
  ]

  return (
    <div>
      <AdminTable titles={titles} rows={rows} />
    </div>
  )
}

