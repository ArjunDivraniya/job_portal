import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CompaniesTable from './CompaniesTable.jsx';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '../../hooks/useGetAllCompanies.jsx';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '../../redux/companySlice.js';

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Update search term in the Redux store whenever input changes
  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 px-4">
        <div className="flex justify-between items-center mb-8">
          {/* Filter Section */}
          <TextField
            sx={{
              width: '60%',
              padding: '8px',
              borderRadius: '8px',
              backgroundColor: '#fafafa',
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                borderColor: '#ddd',
              },
              '& .MuiInputLabel-root': {
                color: '#666',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ddd',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#1976d2',
              },
              '& .MuiInputBase-input': {
                padding: '10px',
              },
            }}
            placeholder="Search by company name"
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          {/* New Company Button */}
          <Button
            onClick={() => navigate('/admin/companies/create')}
            variant="contained"
            sx={{
              backgroundColor: '#1976d2',
              color: 'white',
              padding: '10px 20px',
              fontWeight: 'bold',
              fontSize: '16px',
              borderRadius: '8px',
              boxShadow: 2,
              '&:hover': {
                backgroundColor: '#1565c0',
                boxShadow: 3,
              },
              '&:focus': {
                outline: 'none',
              },
            }}
          >
            New Company
          </Button>
        </div>

        {/* Table Section */}
        <CompaniesTable />
      </div>
    </>
  );
};

export default Companies;
