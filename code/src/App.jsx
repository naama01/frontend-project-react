// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import './css/Global.css'
import UserNewOrder from './components/UserNewOrder'
import TopMenu from './components/TopMenu'
import UserOrderHistory from './components/UserOrderHistory'
import UserOrderStatus from './components/UserOrderStatus'
import HelpPage from './components/HelpPage'
import { Routes, Route } from 'react-router-dom'
import ConfirmOrder from './components/ConfirmOrder'
import SupportChat from './components/SupportChat'
import UpdateStudentSelf from './components/UpdateStudentSelf'
import AdminNew from './components/AdminNew'
import AdminPage from './components/AdminPage'
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './components/Theme';
import { FireWaitProvider } from './components/FireWaitProvider';
export default function App() {


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <div>
          <TopMenu title="המזנונו" />
          <FireWaitProvider>
          <div >

             <Routes >
              <Route path='/' element={<UserNewOrder />} />
              <Route path='/help' element={<HelpPage />} />
              <Route path='/UpdateStudentSelf' element={<UpdateStudentSelf />} />
              <Route path="/AdminClasses" element={<AdminPage dataName="classes" />} />
              <Route path="/AdminDishes" element={<AdminPage dataName="dishes" />} />
              <Route path="/AdminOrders" element={<AdminPage dataName="orders" />} />
              <Route path="/AdminStudents" element={<AdminPage dataName="students" />} />
              <Route path="/AdminNew" element={<AdminNew />} />
              <Route path="/AdminNew/:dataName" element={<AdminNew />} />
              <Route path="/AdminNew/:dataName/:id" element={<AdminNew />} />
              <Route path="/UserOrderHistory" element={<UserOrderHistory />} />
              <Route path="/UserOrderStatus" element={<UserOrderStatus />} />
              <Route path="/ConfirmOrder" element={<ConfirmOrder />} />
              <Route path="/SupportChat" element={<SupportChat />} />
            </Routes>
            
          </div>
      </FireWaitProvider>
        </div >
    </ThemeProvider>
  )
}