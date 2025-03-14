// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import './css/Global.css'
import UserNewOrder from './components/UserNewOrder'
import AdminClasses from './components/AdminClasses'
import AdminDishes from './components/AdminDishes'
import AdminStudents from './components/AdminStudents'
import AdminOrders from './components/AdminOrders'
import TopMenu from './components/TopMenu'
import UserOrderHistory from './components/UserOrderHistory'
import UserOrderStatus from './components/UserOrderStatus'



export default function App() {

  /*
   CURRENTLY CODE IS FOR WIREFRAME AND UI DESIGN
   NO REAL LOGIC FOR NOW

Wireframes done:
        <UserNewOrder />
        <AdminClasses />
      <AdminDishes />
              <AdminStudents />
                      <AdminOrders />
                              <UserOrderStatus />
        <UserOrderHistory />
  */

  return (
    <div>
      <TopMenu title="המזנון של אונו - היסטוריית הזמנות"/>
      <div >
        <UserOrderHistory />
      </div>
    </div >
  )
}