import React, { useState } from 'react'
import './css/Global.css'
import DishMenu from './components/DishMenu'
import AdminClasses from './components/AdminClasses'
import TopMenu from './components/TopMenu'

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
      <TopMenu />
      <div >
        <AdminClasses />
      </div>
    </div >
  )
}