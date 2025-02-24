import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Menu, MenuItem } from '@mui/material';
import { MoreHoriz, Edit, Visibility } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedJobId, setSelectedJobId] = useState(null);

    useEffect(() => {
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) return true;
            return (
                job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
            );
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    const handleMenuOpen = (event, jobId) => {
        setAnchorEl(event.currentTarget);
        setSelectedJobId(jobId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedJobId(null);
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Company Name</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filterJobs?.map((job) => (
                        <TableRow key={job._id}>
                            <TableCell>{job?.company?.name}</TableCell>
                            <TableCell>{job?.title}</TableCell>
                            <TableCell>{job?.createdAt.split('T')[0]}</TableCell>
                            <TableCell align="right">
                                <IconButton onClick={(event) => handleMenuOpen(event, job._id)}>
                                    <MoreHoriz />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl) && selectedJobId === job._id}
                                    onClose={handleMenuClose}
                                    keepMounted
                                >
                                    <MenuItem onClick={() => navigate(`/admin/companies/${job._id}`)}>
                                        <Edit fontSize="small" />
                                        &nbsp; Edit
                                    </MenuItem>
                                    <MenuItem onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}>
                                        <Visibility fontSize="small" />
                                        &nbsp; Applicants
                                    </MenuItem>
                                </Menu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AdminJobsTable;
