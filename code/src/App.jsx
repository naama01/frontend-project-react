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
import HelpPage from './components/HelpPage'
import { Routes, Route } from 'react-router-dom'
import SelectComponent from './components/SelectComponent'
import ConfirmOrder from './components/ConfirmOrder'
import SupportChat from './components/SupportChat'




export default function App() {


  return (
    
    <div>
      <TopMenu title="המזנונו" />
      <div >
      <Routes >
      <Route path='/' element={<UserNewOrder />} />
      <Route path='/help' element={<HelpPage />} />
      <Route path="/AdminClasses" element={<AdminClasses />} />
        <Route path="/AdminDishes" element={<AdminDishes />} />
        <Route path="/AdminOrders" element={<AdminOrders />} />
        <Route path="/AdminStudents" element={<AdminStudents />} />
        <Route path="/UserOrderHistory" element={<UserOrderHistory />} />
        <Route path="/UserOrderStatus" element={<UserOrderStatus />} />
        <Route path="/ConfirmOrder" element={<ConfirmOrder />} />
        <Route path="/SupportChat" element={<SupportChat />} />
      </Routes>

      </div>
    </div >
  )
}