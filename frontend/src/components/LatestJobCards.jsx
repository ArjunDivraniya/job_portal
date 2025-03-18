import React from 'react';
import { Badge, Card, CardContent, Typography, Box, Avatar, Grid, Chip } from '@mui/material';

function LatestJobCards({ job }) {
  return (
    <Card sx={{ maxWidth: 450, boxShadow: 3, borderRadius: 3, margin: 2, overflow: 'hidden' }}>
      <CardContent sx={{ paddingBottom: 3 }}>

        {/* Company Logo and Name */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
          <Avatar
            src={job.company?.logo || '/images/default-logo.png'}
            alt={`${job.company?.name || 'Unknown Company'} Logo`}
            sx={{ width: 50, height: 50 }}
          />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
              {job.company?.name || 'Unknown Company'}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {job.location || 'Location Not Available'}
            </Typography>
          </Box>
        </Box>

        {/* Job Title and Description */}
        <Box sx={{ marginTop: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1876D1' }}>
            {job.title || 'Untitled Job'}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
            {job.description || 'No description available'}
          </Typography>
        </Box>

        {/* Badges Section */}
        <Box sx={{ display: 'flex', gap: 1, marginTop: 3, flexWrap: 'wrap' }}>
          <Chip
            label={job.position || 'N/A'}
            sx={{ backgroundColor: '#E3F2FD', color: '#1976D2', fontWeight: 'bold', borderRadius: 1 }}
          />

          <Chip
            label={job.jobType || 'Unknown'}
            sx={{ backgroundColor: '#E8F5E9', color: '#2E7D32', fontWeight: 'bold', borderRadius: 1 }}
          />

          <Chip
            label={`₹ ${job.salary?.toLocaleString() || 'N/A'}`}
            color="secondary"
            sx={{
              backgroundColor: '#FCE4EC',
              color: '#D81B60',
              fontWeight: 'bold',
              borderRadius: 1,
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export default LatestJobCards;
