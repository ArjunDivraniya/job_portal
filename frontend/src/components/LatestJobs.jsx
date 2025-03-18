import React, { useEffect, useState } from 'react';
import { Grid, Typography, CircularProgress, Container, Box } from '@mui/material';
import LatestJobCards from './LatestJobCards';
import axios from 'axios';

function LatestJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5174/api/v1/jobs/topjobs', {
          withCredentials: true,
        });
        console.log('Fetched Jobs:', response.data);
        setJobs(response.data.jobs || []);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Failed to load jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />;
  }

  if (error) {
    return (
      <Typography variant="h6" sx={{ textAlign: 'center', color: 'red', marginTop: 3 }}>
        {error}
      </Typography>
    );
  }

  if (jobs.length === 0) {
    return (
      <Typography variant="h6" sx={{ textAlign: 'center', color: 'gray', marginTop: 3 }}>
        No jobs available at the moment.
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: '90rem', mx: 'auto', my: 10 }}>
    {/* Title Section */}
    <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}>
      <span style={{ color: '#9C27B0' }}>Latest & Top </span>
      Job Openings
    </Typography>

    {/* Jobs Grid Section */}
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Grid container spacing={3} sx={{ maxWidth: 1200 }}>
        {jobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job._id}>
            <LatestJobCards job={job} />
          </Grid>
        ))}
      </Grid>
    </Box>
  </Box>

  );
}

export default LatestJobs;
