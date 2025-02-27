import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: '100px' }}>
            <Box sx={{ marginBottom: '20px' }}>
                <Typography variant="h3" color="primary" gutterBottom>
                    404 - Page Not Found
                </Typography>
                <Typography variant="h6" color="textSecondary" paragraph>
                    Sorry, the page you're looking for does not exist.
                </Typography>
                <Box sx={{ maxWidth: '100%', display: 'flex', justifyContent: 'center' }}>
                    <img
                        src="https://cdn.svgator.com/images/2024/04/detective-animation-404-error-page.gif"
                        alt="404 Animation"
                        style={{ width: '100%', height: 'auto' }} 
                    />
                </Box>
            </Box>
            <Button 
                variant="contained" 
                color="primary" 
                component={Link} 
                to="/"
                sx={{ marginTop: '20px' }}
            >
                Go to Home
            </Button>
            
        </Container>
    );
};

export default NotFound;