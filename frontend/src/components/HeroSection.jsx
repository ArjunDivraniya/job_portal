import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search'; // Import the Search icon

function HeroSection() {
    return (
        <>
            <div className="text-center py-16 px-4 bg-gradient-to-r from-[#ffffff] to-[#ffffff] text-black bg-opacity-10">
                <div className="flex flex-col items-center gap-5 mb-12">
                    <span className="px-6 py-2 rounded-full font-medium bg-gray-200 text-[#9C27B0] text-sm">
                        No. 1 Job Hunt Website
                    </span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-semibold leading-tight mb-4">
                    Search, Apply & <br /> Get Your <span className="text-[#9C27B0]">Dream Jobs</span>
                </h1>
                <p className="text-lg mb-6 text-black-300">
                    Find the perfect job for you and kickstart your career with ease.
                </p>
                <div className="flex justify-center gap-4">
                    <TextField
                        label="Find your dream job"
                        variant="outlined"
                        fullWidth
                        placeholder="Enter job title, skills, or company"
                        className="max-w-300 rounded-full"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '30px',
                                color: 'white'
                            },
                        }}
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        className="text-white px-6 sm:px-8 rounded-full"
                        sx={{
                            borderRadius: '30px',
                        }}
                    >
                        <SearchIcon />
                    </Button>
                </div>
            </div>
        </>
    );
}

export default HeroSection;
