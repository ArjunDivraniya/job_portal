import React from 'react';
import { Badge, Card, CardContent, Typography, Box } from '@mui/material';

function LatestJobCards() {
  return (
    <Card sx={{ maxWidth: 450, boxShadow: 3, borderRadius: 2, margin: 2, overflow: 'hidden' }}>
      <CardContent sx={{ paddingBottom: 3 }}>
        {/* Company Name */}
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: '#333' }}>
          Company Name
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ fontStyle: 'italic' }}>
          India
        </Typography>

        {/* Job Title and Description */}
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1876D1' }}>
            Job Title
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam, suscipit?
          </Typography>
        </Box>

        {/* Badges Section */}
        <Box sx={{ display: 'flex', gap: 2, marginTop: 3 }}>
          <Badge
            badgeContent="12"
            color="primary"
            sx={{
              fontWeight: 'bold',
              padding: '5px 10px',
              borderRadius: 2,
              backgroundColor: '#f1f9ff',
              color: '#1876D1',
              fontSize: '14px',
            }}
            variant="standard"
          >
            Positions
          </Badge>

          <Badge
            badgeContent="Part Time"
            color="default"
            sx={{
              fontWeight: 'bold',
              padding: '5px 10px',
              borderRadius: 2,
              backgroundColor: '#f1f9ff',
              color: '#00000', // Corrected to black color
              fontSize: '14px',
            }}
            variant="dot"
          >
            Job Type
          </Badge>

          <Badge
            badgeContent="24LPA"
            color="secondary"
            sx={{
              fontWeight: 'bold',
              padding: '5px 10px',
              borderRadius: 2,
              backgroundColor: '#f1f9ff',
              color: '#9C27B0',
              fontSize: '14px',
            }}
            variant="dot"
          >
            Salary
          </Badge>
        </Box>
      </CardContent>
    </Card>
  );
}

export default LatestJobCards;
