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
import UpdateStudentSelf from './components/UpdateStudentSelf'
import AdminNew from './components/AdminNew'
import AdminPage from './components/AdminPage'


export default function App() {


  return (

    <div>
      <TopMenu title="המזנונו" />
      <div >
        <Routes >
          <Route path='/' element={<UserNewOrder />} />
          <Route path='/help' element={<HelpPage />} />
          <Route path='/UpdateStudentSelf' element={<UpdateStudentSelf />} />
          <Route path="/AdminClasses" element={<AdminPage dataname="classes" />} />
          <Route path="/AdminDishes" element={<AdminPage dataname="dishes" />} />
          <Route path="/AdminOrders" element={<AdminPage dataname="orders" />} />
          <Route path="/AdminStudents" element={<AdminPage dataname="students" />} />
          <Route path="/AdminNew" element={<AdminNew />} />
          <Route path="/UserOrderHistory" element={<UserOrderHistory />} />
          <Route path="/UserOrderStatus" element={<UserOrderStatus />} />
          <Route path="/ConfirmOrder" element={<ConfirmOrder />} />
          <Route path="/SupportChat" element={<SupportChat />} />
        </Routes>

      </div>
    </div >
  )
}