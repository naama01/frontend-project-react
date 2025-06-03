import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminTable from './AdminTable';
import Button from '@mui/material/Button';
import '../css/AdminPage.css'

export default function AdminPage({ dataName }) {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <div className="admin-page-wrapper" >
      <AdminTable dataName={dataName} />
      <div className="toolbox">
        <Button
          variant="contained"
          onClick={() => navigate(`/AdminNew/${dataName}`)}
          style={{ backgroundColor: '#4CAF50', color: 'white' }}
        >
          הוסף רשומה חדשה
        </Button>
      </div>
    </div>
  );
}