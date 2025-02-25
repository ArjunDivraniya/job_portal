import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector((store) => store.job);

    // Function to determine the color of the status tag
    const getStatusTagStyle = (status) => {
        switch (status) {
            case 'pending':
                return { backgroundColor: '#2196f3', color: 'white' }; // Blue
            case 'rejected':
                return { backgroundColor: '#f44336', color: 'white' }; // Red
            case 'accepted':
                return { backgroundColor: '#4caf50', color: 'white' }; // Green
            default:
                return { backgroundColor: '#9e9e9e', color: 'white' }; // Gray
        }
    };

    return (
        <TableContainer
            component={Paper}
            sx={{
                marginTop: 2,
                borderRadius: '8px',
                boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell
                            sx={{
                                backgroundColor: 'primary.main',
                                color: 'common.white',
                                fontWeight: 'bold',
                                padding: 2,
                            }}
                        >
                            Date
                        </TableCell>
                        <TableCell
                            sx={{
                                backgroundColor: 'primary.main',
                                color: 'common.white',
                                fontWeight: 'bold',
                                padding: 2,
                            }}
                        >
                            Job Role
                        </TableCell>
                        <TableCell
                            sx={{
                                backgroundColor: 'primary.main',
                                color: 'common.white',
                                fontWeight: 'bold',
                                padding: 2,
                            }}
                        >
                            Company
                        </TableCell>
                        <TableCell
                            sx={{
                                backgroundColor: 'primary.main',
                                color: 'common.white',
                                fontWeight: 'bold',
                                textAlign: 'right',
                                padding: 2,
                            }}
                        >
                            Status
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        allAppliedJobs.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} sx={{ textAlign: 'center' }}>
                                    <Typography variant="h6" color="textSecondary">
                                        You haven't applied for any jobs yet.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            allAppliedJobs.map((appliedJob) => (
                                <TableRow
                                    key={appliedJob._id}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'action.hover',
                                        },
                                    }}
                                >
                                    <TableCell sx={{ padding: 2 }}>
                                        {appliedJob.createdAt?.split('T')[0]}
                                    </TableCell>
                                    <TableCell sx={{ padding: 2 }}>
                                        {appliedJob.job?.title}
                                    </TableCell>
                                    <TableCell sx={{ padding: 2 }}>
                                        {appliedJob.job?.company?.name}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            padding: 2,
                                            textAlign: 'right',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        <span
                                            style={{
                                                padding: '5px 10px',
                                                borderRadius: '12px',
                                                display: 'inline-block',
                                                ...getStatusTagStyle(appliedJob.status),
                                            }}
                                        >
                                            {appliedJob.status.toUpperCase()}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AppliedJobTable;
