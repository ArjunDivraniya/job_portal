import React, { useState } from 'react';
import { Typography, IconButton, Avatar, Button, Box, Badge } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
    const navigate = useNavigate();
    const [saved, setSaved] = useState(false);

    // Function to calculate days ago
    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

    return (
        <div
            className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
            style={{
                marginTop: '20px',
                borderRadius: '16px',
                width: '100%',
                height: 'auto',
            }}
        >
            <div className="flex justify-between items-center">
                <Typography variant="body2" sx={{ color: '#757575', fontStyle: 'italic' }}>
                    {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                </Typography>

                <IconButton onClick={() => setSaved(!saved)}>
                    {saved ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
                </IconButton>
            </div>

            <div className="flex items-center gap-3 mt-2">
                <Button
                    variant="outlined"
                    sx={{
                        borderColor: '#e0e0e0',
                        borderWidth: 1.5,
                        borderRadius: '12px',
                        padding: 0,
                        '&:hover': {
                            borderColor: '#1976d2',
                        },
                    }}
                >
                    <Avatar
                        alt="Company Logo"
                        src={job?.company?.logo || "https://via.placeholder.com/45"}
                        sx={{ width: 45, height: 45 }}
                    />
                </Button>

                <div>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
                        {job?.company?.name || 'Company Name'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#757575' }}>
                        {job?.location || 'India'}
                    </Typography>
                </div>
            </div>

            <Typography variant="h6" sx={{ fontWeight: 600, mt: 2, color: '#333' }}>
                {job?.title || 'Job Title'}
            </Typography>

            <Typography variant="body1" sx={{ mt: 1, color: '#555', lineHeight: 1.6 }}>
                {job?.description || 'Job description goes here...'}
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, marginTop: 3 }}>
                <Badge
                    badgeContent={job?.position || "12"}
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
                    badgeContent={job?.jobType || "Part Time"}
                    color="default"
                    sx={{
                        fontWeight: 'bold',
                        padding: '5px 10px',
                        borderRadius: 2,
                        backgroundColor: '#f1f9ff',
                        color: '#00000',
                        fontSize: '14px',
                    }}
                    variant="dot"
                >
                    Job Type
                </Badge>

                <Badge
                    badgeContent={job?.salary || "24LPA"}
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

            <Box sx={{ display: 'flex', gap: 2, marginTop: 3 }}>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        borderRadius: '10px',
                        textTransform: 'none',
                        padding: '8px 20px',
                        boxShadow: 2,
                        '&:hover': {
                            backgroundColor: '#1976d2',
                            boxShadow: 3,
                        },
                    }}
                    onClick={() => navigate(`/description/${job?._id}`)}
                >
                    Details
                </Button>

                <Button
                    variant="outlined"
                    color="secondary"
                    sx={{
                        borderRadius: '10px',
                        textTransform: 'none',
                        padding: '8px 20px',
                        boxShadow: 2,
                        '&:hover': {
                            backgroundColor: '#9C27B0',
                            color: '#fff',
                            boxShadow: 3,
                        },
                    }}
                >
                    Save For Later
                </Button>
            </Box>
        </div>
    );
}

export default Job;
