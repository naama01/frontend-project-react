import React, { useState } from 'react'
import './css/Global.css'
import DishMenu from './components/DishMenu'
import AdminClasses from './components/AdminClasses'

export default function App() {

  /*
   CURRENTLY CODE IS FOR WIREFRAME AND UI DESIGN
   NO REAL LOGIC FOR NOW

Wireframes done:
           <DishMenu />
        <AdminClasses />


  */

  return (
    <div>
      <div className='TopHeader'>
        <h1 className="title">תפריט המזנון של אונו - ניהול כיתות</h1>
        <div className="HeaderCTRL">
          <button>לצ׳ט עם מייקל</button><button>שמור</button><button>יציאה</button>
        </div>
      </div>
      <div >
        <AdminClasses />
      </div>
    </div >
  )
}