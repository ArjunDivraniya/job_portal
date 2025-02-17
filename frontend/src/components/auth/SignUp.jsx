import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '../../utils/constant.js';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../redux/authSlice.js';
import CircularProgress from '@mui/material/CircularProgress';

function SignUp() {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        password: "",
        confirm_password: "",
        phone: "",
        role: "",  // We will set this based on user type (student/recruiter)
    });
    const navigate = useNavigate();
    const { loading } = useSelector(store => store.auth); // Access the loading state
    const [userType, setUserType] = useState('student');  // Default role is 'student'
    const [profilePic, setProfilePic] = useState(null);
    const dispatch = useDispatch();

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value,
        });
    };

    // Handle radio button change for user type
    const handleRadioChange = (event) => {
        setUserType(event.target.value);
        setInput({
            ...input,
            role: event.target.value,  // Set role to the selected user type
        });
    };

    // Handle file change for profile picture
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')) {
            setProfilePic(file);
        } else {
            alert('Please upload a valid image file (PNG, JPG, JPEG).');
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form fields
        if (input.password !== input.confirm_password) {
            toast.error('Passwords do not match.');
            return;
        }

        if (!input.fullname || !input.email || !input.phone || !input.password || !input.confirm_password || !input.role) {
            toast.error('Please fill in all the fields.');
            return;
        }

        // Create FormData object for file upload
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phone);
        formData.append("password", input.password);
        formData.append("role", input.role);

        if (profilePic) {
            formData.append("file", profilePic); // Append profile picture file if selected
        }

        // Log form data
        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });

        // Start loading state
        dispatch(setLoading(true));

        try {
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                withCredentials: true,
            });

            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);  // Display success message
            } else {
                toast.error(res.data.message || 'Something went wrong.');
            }

        } catch (error) {
            console.error('Error during sign up:', error);
            toast.error(error.response?.data?.message || 'An error occurred. Please try again later.');
        } finally {
            dispatch(setLoading(false));  // Stop loading state
        }
    };

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
                <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
                    <h1 className="font-bold text-3xl text-center text-[#1876D1] mb-6">Sign Up</h1>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Full Name */}
                        <div>
                            <TextField
                                id="fullname"
                                label="Full Name"
                                variant="outlined"
                                fullWidth
                                type="text"
                                name="fullname"
                                value={input.fullname}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Email Address */}
                        <div>
                            <TextField
                                id="email"
                                label="Email Address"
                                variant="outlined"
                                fullWidth
                                type="email"
                                name="email"
                                value={input.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Phone Number */}
                        <div>
                            <TextField
                                id="phone"
                                label="Phone Number"
                                variant="outlined"
                                fullWidth
                                type="tel"
                                name="phone"
                                value={input.phone}
                                onChange={handleChange}
                                placeholder="(123) 456-7890"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <TextField
                                id="password"
                                label="Password"
                                variant="outlined"
                                fullWidth
                                type="password"
                                name="password"
                                value={input.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <TextField
                                id="confirm-password"
                                label="Confirm Password"
                                variant="outlined"
                                fullWidth
                                type="password"
                                name="confirm_password"
                                value={input.confirm_password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* User Type Radio Buttons */}
                        <div>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    aria-label="user-type"
                                    name="user-type"
                                    value={userType}
                                    onChange={handleRadioChange}
                                    row
                                >
                                    <FormControlLabel
                                        value="student"
                                        control={<Radio />}
                                        label="Student"
                                    />
                                    <FormControlLabel
                                        value="recruiter"
                                        control={<Radio />}
                                        label="Recruiter"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </div>

                        {/* Profile Picture Upload */}
                        <div>
                            <label htmlFor="profile-pic" className="block text-sm font-medium text-gray-700">
                                Upload Profile Picture
                            </label>
                            <input
                                type="file"
                                id="profile-pic"
                                accept="image/png, image/jpeg, image/jpg"
                                onChange={handleFileChange}
                                className="mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-gray-700 file:bg-gray-100 hover:file:bg-gray-200"
                            />
                            {profilePic && (
                                <p className="text-sm text-gray-600 mt-2">Selected File: {profilePic.name}</p>
                            )}
                        </div>

                        {/* Sign Up Button */}
                        <div>
                            {loading ? (
                                <Button className='w-full my-4' disabled>
                                    <CircularProgress size={24} color="inherit" />
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    disabled={loading}
                                >
                                    Sign Up
                                </Button>
                            )}
                        </div>

                        {/* Login Link */}
                        <div className="text-center text-sm text-gray-500 mt-4">
                            Already have an account?{' '}
                            <Link to="/login" className="text-[#1876D1] hover:text-[#1568B1]">
                                Login here
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
