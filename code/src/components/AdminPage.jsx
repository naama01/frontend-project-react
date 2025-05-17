import React, { useState, useEffect } from 'react';
import AdminTable from './AdminTable';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { fireReadCollection, fireReadTitles } from '../firebase'; // Import Firestore functions
import AdminNew from './AdminNew';

export default function AdminPage({ dataname }) {



  return (
    <div>

      <AdminTable dataname={dataname} />

    </div>
  );
}