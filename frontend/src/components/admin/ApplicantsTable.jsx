import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper, Popover, IconButton, MenuItem, Typography, Box } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '../../utils/constant';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedApplicant, setSelectedApplicant] = React.useState(null);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const handleMenuOpen = (event, applicant) => {
        setAnchorEl(event.currentTarget);
        setSelectedApplicant(applicant);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedApplicant(null);
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Full Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Contact</TableCell>
                            <TableCell>Resume</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {applicants?.applications?.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell>{item?.applicant?.fullname}</TableCell>
                                <TableCell>{item?.applicant?.email}</TableCell>
                                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell>
                                    {item?.applicant?.profile?.resume ? (
                                        <a href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2' }}>
                                            {item?.applicant?.profile?.resumeOriginalName}
                                        </a>
                                    ) : (
                                        <span>NA</span>
                                    )}
                                </TableCell>
                                <TableCell>{item?.applicant?.createdAt.split("T")[0]}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={(event) => handleMenuOpen(event, item)}>
                                        <MoreHoriz />
                                    </IconButton>
                                    <Popover
                                        open={Boolean(anchorEl) && selectedApplicant?._id === item._id}
                                        anchorEl={anchorEl}
                                        onClose={handleMenuClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                    >
                                        <Box sx={{ padding: 1 }}>
                                            {shortlistingStatus.map((status, index) => (
                                                <MenuItem
                                                    key={index}
                                                    onClick={() => {
                                                        statusHandler(status, item?._id);
                                                        handleMenuClose();
                                                    }}
                                                >
                                                    {status}
                                                </MenuItem>
                                            ))}
                                        </Box>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ApplicantsTable;
