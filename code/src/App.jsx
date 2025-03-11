import React, { useState } from 'react'
import './css/Global.css'
import DishMenu from './components/DishMenu'

export default function App() {

  /*
   CURRENTLY CODE IS FOR WIREFRAME AND UI DESIGN
   NO REAL LOGIC FOR NOW
  */
 
  return (
    <div>
      <div className='TopHeader'>
        <h1 className="title">תפריט המזנון של אונו</h1>
        <div className="HeaderCTRL">
          <button>d</button><button>s</button><button>s</button>
        </div>
        </div>
      <div >
        <DishMenu />
      </div>
    </div >
  )
}