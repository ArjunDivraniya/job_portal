import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import BasicPopover from '../ui/popOver.jsx';

function Navbar() {
    const user = false;

    return (
        <>
            <div className='bg-white shadow-md'>
                <div className="flex items-center justify-between mx-auto max-w-7xl h-20 px-8">
                    {/* Logo */}
                    <div className="flex items-center">
                        <h1 className='text-3xl sm:text-4xl font-semibold text-gray-800'>
                            Job<span className='text-[#1876D1]'>mentum</span>
                        </h1>
                    </div>
                    {/* Navigation */}
                    <div className="flex items-center gap-6">
                        <ul className='flex font-medium items-center gap-6'>
                            <li className="hover:text-[#F83002] cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"><Link to= "/">Home</Link></li>
                            <li className="hover:text-[#F83002] cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"><Link to= "/jobs">Jobs</Link></li>
                            <li className="hover:text-[#F83002] cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"><Link to= "/browse">Browse</Link></li>
                        </ul>

                        {user ? (
                            <BasicPopover />
                        ) : (
                            <div className="flex gap-4">
                                <Link to="/login">
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        sx={{
                                            borderRadius: '30px',
                                            textTransform: 'none',
                                            padding: '8px 20px',
                                            boxShadow: 2,
                                            '&:hover': {
                                                backgroundColor: '#0069d9',
                                                boxShadow: 3,
                                            },
                                        }}
                                    >
                                        Login
                                    </Button>
                                </Link>

                                <Link to="/signup">
                                    <Button
                                        variant='contained'
                                        color='secondary'
                                        sx={{
                                            borderRadius: '30px',
                                            textTransform: 'none',
                                            padding: '8px 20px',
                                            boxShadow: 2,
                                            '&:hover': {
                                                backgroundColor: '#c2185b',
                                                boxShadow: 3,
                                            },
                                        }}
                                    >
                                        SignUp
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;
