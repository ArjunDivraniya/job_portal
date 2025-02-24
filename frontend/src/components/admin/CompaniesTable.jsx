import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../../utils/constant.js';

const CompaniesTable = () => {
    const { companies } = useSelector(store => store.company);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedCompany, setSelectedCompany] = React.useState(null);

    const handleClick = (event, companyId) => {
        setAnchorEl(event.currentTarget);
        setSelectedCompany(companyId);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedCompany(null);
    };

    const handleStatusUpdate = async (status) => {
        if (!selectedCompany) return;
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${COMPANY_API_END_POINT}/status/${selectedCompany}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred');
        } finally {
            handleClose();
        }
    };

    return (
        <TableContainer
            component={Paper}
            sx={{
                borderRadius: 4,
                maxWidth: '90%',
                margin: '20px auto',
                overflow: 'hidden',
            }}
        >
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableCell sx={{ fontWeight: 'bold', padding: '16px', color: '#333', fontSize: '16px' }}>Company Name</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', padding: '16px', color: '#333', fontSize: '16px' }}>Email</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', padding: '16px', color: '#333', fontSize: '16px' }}>Contact</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', padding: '16px', color: '#333', fontSize: '16px' }}>Website</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', padding: '16px', color: '#333', fontSize: '16px' }}>Founded</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 'bold', padding: '16px', color: '#333', fontSize: '16px' }}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {companies?.map((company) => (
                        <TableRow
                            key={company._id}
                            sx={{
                                '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
                                '&:hover': { backgroundColor: '#f0f0f0', cursor: 'pointer' },
                                transition: 'background-color 0.3s ease',
                            }}
                        >
                            <TableCell sx={{ padding: '12px', fontSize: '14px' }}>{company.name}</TableCell>
                            <TableCell sx={{ padding: '12px', fontSize: '14px' }}>{company.email}</TableCell>
                            <TableCell sx={{ padding: '12px', fontSize: '14px' }}>{company.contact}</TableCell>
                            <TableCell sx={{ padding: '12px', fontSize: '14px' }}>
                                {company.website ? (
                                    <a
                                        href={company.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            color: '#1976d2',
                                            textDecoration: 'none',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {company.website}
                                    </a>
                                ) : (
                                    'N/A'
                                )}
                            </TableCell>
                            <TableCell sx={{ padding: '12px', fontSize: '14px' }}>{company.founded}</TableCell>
                            <TableCell align="right" sx={{ padding: '12px', fontSize: '14px' }}>
                                <IconButton
                                    onClick={(event) => handleClick(event, company._id)}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: '#e0e0e0',
                                            borderRadius: '4px',
                                        },
                                        padding: '8px',
                                    }}
                                >
                                    <MoreVertIcon />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl && selectedCompany === company._id)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={() => handleStatusUpdate('Approved')}>Approve</MenuItem>
                                    <MenuItem onClick={() => handleStatusUpdate('Rejected')}>Reject</MenuItem>
                                </Menu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CompaniesTable;
