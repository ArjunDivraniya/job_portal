import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
    Box
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';  // New import for Edit icon
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

    const handleEditCompany = async () => {
        if (!selectedCompany) return;

        // Handle the "Edit" action. For example, you can navigate to an edit page.
        // You can also open a modal or form to edit the company's details.
        toast.info('Navigating to edit page...');
        // For example, you might use `history.push(`/admin/companies/${selectedCompany}/edit`)` 
        // if you are using React Router, or open a modal for editing.
        
        handleClose();  // Close the menu after the action is done.
    };

    return (
        <Box sx={{ maxWidth: '95%', margin: 'auto', mt: 4 }}>
            <TableContainer
                component={Paper}
                sx={{
                    borderRadius: 4,
                    boxShadow: 3,
                    overflow: 'hidden',
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#1e1e1e' }}>
                            <TableCell sx={{ fontWeight: 'bold', color: '#fff', padding: '16px' }}>Company Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#fff', padding: '16px' }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#fff', padding: '16px' }}>Contact</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#fff', padding: '16px' }}>Website</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#fff', padding: '16px' }}>Founded</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold', color: '#fff', padding: '16px' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {companies?.map((company) => (
                            <TableRow
                                key={company._id}
                                sx={{
                                    '&:nth-of-type(odd)': { backgroundColor: '#f8f9fa' },
                                    '&:hover': { backgroundColor: '#e9ecef', transition: '0.3s ease' },
                                }}
                            >
                                <TableCell sx={{ padding: '12px', fontSize: '14px', fontWeight: 500 }}>
                                    {company.name}
                                </TableCell>
                                <TableCell sx={{ padding: '12px', fontSize: '14px' }}>{company.email}</TableCell>
                                <TableCell sx={{ padding: '12px', fontSize: '14px' }}>{company.contact}</TableCell>
                                <TableCell sx={{ padding: '12px', fontSize: '14px' }}>
                                    {company.website ? (
                                        <a
                                            href={company.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                color: '#007bff',
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
                                <TableCell align="right" sx={{ padding: '12px' }}>
                                    <Tooltip title="Actions" arrow>
                                        <IconButton
                                            onClick={(event) => handleClick(event, company._id)}
                                            sx={{
                                                '&:hover': { backgroundColor: '#dee2e6', borderRadius: '50%' },
                                                padding: '8px',
                                            }}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl && selectedCompany === company._id)}
                                        onClose={handleClose}
                                    >
                                        {/* Edit action */}
                                        <MenuItem onClick={handleEditCompany}>
                                            <EditIcon sx={{ color: '#1876D1' , mr: 1 }} /> Edit
                                        </MenuItem>
                                    </Menu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default CompaniesTable;
