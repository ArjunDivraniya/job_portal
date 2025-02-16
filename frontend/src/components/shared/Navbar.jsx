import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import BasicPopover from '../ui/popOver.jsx'
import logo from '../../assets/logo.jpg'

function Navbar() {
    const user = false;

    return (
        <>
            <div className='bg-white shadow-md'>
                <div className="flex items-center justify-between mx-auto max-w-7xl h-20 px-8"> {/* Increased height and padding */}
                    {/* Logo */}
                    <div className="flex items-center">
                        <img src={logo} alt="Jobmentum Logo" className="h-16 mr-3" /> {/* Increased logo size */}
                        <h1 className='text-4xl font-bold text-gray-800'> {/* Increased font size */}
                            Job<span className='text-[#F83002]'>mentum</span>
                        </h1>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center gap-7"> {/* Increased gap between nav items */}
                        {/* Navigation Links */}
                        <ul className='flex font-medium items-center gap-7'> {/* Increased gap */}
                            <li className="hover:text-[#F83002] cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">Home</li>
                            <li className="hover:text-[#F83002] cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">Jobs</li>
                            <li className="hover:text-[#F83002] cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">Browse</li>
                        </ul>

                        {/* Conditional rendering for user */}
                        {user ? (
                            <BasicPopover />
                        ) : (
                            <div className="flex gap-6"> {/* Increased gap */}
                                {/* Login Button */}
                                <Link to="/login">
                                <Button
                                    variant='contained'
                                    color='primary'
                                    sx={{
                                        borderRadius: '30px',
                                        textTransform: 'none',
                                        padding: '10px 25px',  
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

                                {/* SignUp Button */}
                                <Link to="/signup">
                                <Button
                                    variant='contained'
                                    color='secondary'
                                    sx={{
                                        borderRadius: '30px',
                                        textTransform: 'none',
                                        padding: '10px 25px',  
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
    )
}

export default Navbar;
