import React from 'react';
import { Typography, IconButton, Avatar, Button, Box, Badge } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useNavigate } from 'react-router-dom';

function Job() {
    const navigate = useNavigate();
    const jobId = "itjjthgu4tyoiutyoiegyhth";
    return (
        <div
            className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
            style={{
                marginTop: '20px',
                borderRadius: '16px', // Adds a softer corner radius for better aesthetic
                width: '100%', // Ensures the card takes up the full available width
                height: 'auto', // Removes maxHeight constraint for rectangular shape
           
            }}
        >
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Typography variant="body2" sx={{ color: '#757575', fontStyle: 'italic' }}>
                        2 days ago
                    </Typography>
                </div>

                <div>
                    <IconButton
                        color="primary"
                        sx={{
                            '&:hover': {
                                backgroundColor: '#f1f1f1',
                            },
                        }}
                    >
                        <BookmarkIcon />
                    </IconButton>
                </div>
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
                        src="https://img.freepik.com/premium-vector/soaring-high-designing-unique-logos-paragliding-companies-with-dynamic-vector-art_579306-21732.jpg"
                        sx={{ width: 45, height: 45 }}
                    />
                </Button>

                <div>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
                        Company Name
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#757575' }}>
                        India
                    </Typography>
                </div>
            </div>

            <Typography variant="h6" sx={{ fontWeight: 600, mt: 2, color: '#333' }}>
                Job Title
            </Typography>

            <Typography variant="body1" sx={{ mt: 1, color: '#555', lineHeight: 1.6 }}>
               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis adipisci ad soluta voluptatibus, vel impedit aliquam perspiciatis iure?
            </Typography>

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
                        color: '#000',
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
                    onClick={()=> navigate(`description/${jobId}`)}
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
