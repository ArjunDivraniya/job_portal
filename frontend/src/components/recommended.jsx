import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import axios from 'axios';

const RecommendedJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const studentId = localStorage.getItem('studentId'); // Get student ID from localStorage

    useEffect(() => {
        if (!studentId) {
            setLoading(false);
            return; // Stop fetching if no student ID
        }

        axios.get(`http://localhost:5174/api/v1/jobs/getrecommendedjobs/${studentId}`)
            .then(response => {
                setJobs(response.data.recommendedJobs);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching jobs:', error);
                setLoading(false);
            });
    }, [studentId]);

    if (loading) return <Typography>Loading...</Typography>;

    return (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {jobs.length > 0 ? (
                jobs.map(job => (
                    <Card key={job._id} sx={{ borderRadius: '16px', boxShadow: 3, p: 2 }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight="bold">
                                {job.title}
                            </Typography>
                            <Typography color="text.secondary">{job.company}</Typography>
                            <Typography variant="body2" color="text.secondary">{job.location}</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                                Skills: {job.requirements.join(', ')}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary">Apply Now</Button>
                        </CardActions>
                    </Card>
                ))
            ) : (
                <Typography>No recommended jobs found.</Typography>
            )}
        </div>
    );
};

export default RecommendedJobs;
