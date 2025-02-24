import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { TextField, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs.jsx';
import { setSearchJobByText } from '../../redux/jobSlice.js';

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div>
      <Navbar />
      <Container maxWidth="lg">
        <div className="my-10">
          <div className="flex items-center justify-between my-5">
            <TextField
              variant="outlined"
              placeholder="Filter by name, role"
              onChange={(e) => setInput(e.target.value)}
              size="small"
            />
            <Button variant="contained" color="primary" onClick={() => navigate('/admin/jobs/create')}>
              New Job
            </Button>
          </div>
          <AdminJobsTable />
        </div>
      </Container>
    </div>
  );
};

export default AdminJobs;
