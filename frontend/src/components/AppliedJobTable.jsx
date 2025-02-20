import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const AppliedJobTable = () => {
  // Example data for applied jobs
  const appliedJobs = [
    { date: '2025-01-15', jobRole: 'Software Engineer', company: 'TechCorp', status: 'Interviewing' },
    { date: '2025-01-20', jobRole: 'Product Manager', company: 'InnovateX', status: 'Applied' },
    { date: '2025-01-25', jobRole: 'UX Designer', company: 'CreativeCo', status: 'Offer Received' },
  ];

  // Define a function to return different colors for tags based on the status
  const getStatusTagStyle = (status) => {
    switch (status) {
      case 'Interviewing':
        return { backgroundColor: '#2196f3', color: 'white' }; // Green
      case 'Applied':
        return { backgroundColor: '#9C27B0', color: 'white' }; // Orange
      case 'Offer Received':
        return { backgroundColor: '#4caf50', color: 'white' }; // Blue
      default:
        return { backgroundColor: '#9e9e9e', color: 'white' }; // Gray
    }
  };

  return (
    <>
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
            {appliedJobs.map((job, index) => (
              <TableRow
                key={index}
                sx={{
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <TableCell sx={{ padding: 2 }}>{job.date}</TableCell>
                <TableCell sx={{ padding: 2 }}>{job.jobRole}</TableCell>
                <TableCell sx={{ padding: 2 }}>{job.company}</TableCell>
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
                      ...getStatusTagStyle(job.status),
                    }}
                  >
                    {job.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AppliedJobTable;
