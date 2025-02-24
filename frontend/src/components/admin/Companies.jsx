import React from 'react';
import Navbar from '../shared/Navbar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CompaniesTable from './CompaniesTable.jsx';

const Companies = () => {
    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto my-10 px-4">
                <div className="flex justify-between items-center mb-6">
                    {/* Filter Section */}
                    <TextField
                        sx={{
                            width: '50%',
                            padding: '8px',
                            borderRadius: '4px',
                            backgroundColor: '#f4f4f4',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '4px',
                            },
                            '& .MuiInputLabel-root': {
                                color: '#888',
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#ddd',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#1976d2',
                            }
                        }}
                        placeholder='Filter by name'
                        variant="outlined"
                    />
                    
                    {/* New Company Button */}
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#1976d2',
                            color: 'white',
                            padding: '8px 16px',
                            fontWeight: 'bold',
                            borderRadius: '4px',
                            '&:hover': {
                                backgroundColor: '#1565c0',
                            },
                            boxShadow: 2,
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
