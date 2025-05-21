import React, { useState, useEffect } from 'react';
import AdminTable from './AdminTable';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { fireReadCollection, fireReadTitles } from '../firebase'; // Import Firestore functions
import AdminNew from './AdminNew';
import '../css/AdminPage.css'
import { useNavigate } from 'react-router-dom';

export default function AdminPage({ dataname }) {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <div className="admin-page-wrapper" >
      <AdminTable dataname={dataname} />
      <div className="toolbox">
        <Button
          variant="contained"
          onClick={() => navigate(`/AdminNew/${dataname}`)}
          style={{ backgroundColor: '#4CAF50', color: 'white' }}
        >
          הוסף רשומה חדשה
        </Button>
      </div>
    </div>
  );
}