// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import './css/Global.css'
import UserNewOrder from './components/UserNewOrder'
import AdminClasses from './components/AdminClasses'
import AdminDishes from './components/AdminDishes'
import AdminStudents from './components/AdminStudents'
import AdminOrders from './components/AdminOrders'
import TopMenu from './components/TopMenu'

export default function App() {

  /*
   CURRENTLY CODE IS FOR WIREFRAME AND UI DESIGN
   NO REAL LOGIC FOR NOW

Wireframes done:
           <DishMenu />
        <AdminClasses />
      <AdminDishes />
              <AdminStudents />
                      <AdminOrders />




  */

  return (
    <div>
      <TopMenu title="המזנון של אונו - ניהול"/>
      <div >
        <UserNewOrder />
      </div>
    </div >
  )
}