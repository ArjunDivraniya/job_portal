import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '../../utils/constant.js';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '../../redux/authSlice.js';
import CircularProgress from '@mui/material/CircularProgress';


const SignUp = () => {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "student",
        file: ""
    });
    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        // Check form data before appending
        console.log("Form Data:", input);

        // Append form fields
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber.replace(/\s+/g, ''));
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }



        // Log the form data to see if everything is correct
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }


        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
           
            if (res.data.success) {
                console.log("User received from backend:", res.data.user);  
                toast.success(res.data.message);
                
                dispatch(setUser(res.data.success)); 
            
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            }            
                
        } catch (error) {
            // Log the full error response
            console.log("Error:", error.response ? error.response.data : error);
            toast.error(error.response ? error.response.data.message : "Something went wrong");
        } finally {
            dispatch(setLoading(false));
        }
    };


    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, []);

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
                <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
                    <h1 className="font-bold text-3xl text-center text-[#1876D1] mb-6">Sign Up</h1>

                    <form className="space-y-6" onSubmit={submitHandler}>
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
                                onChange={changeEventHandler}
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
                                onChange={changeEventHandler}
                                required
                            />
                        </div>

                        {/* Phone Number */}
                        <div>
                            <TextField
                                id="phoneNumber"
                                label="Phone Number"
                                variant="outlined"
                                fullWidth
                                type="tel"
                                name="phoneNumber"
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
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
                                onChange={changeEventHandler}
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
                                onChange={changeEventHandler}
                                required
                            />
                        </div>

                        {/* User Type Radio Buttons */}
                        <div>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    aria-label="user-type"
                                    name="role"
                                    value={input.role}
                                    onChange={changeEventHandler}
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
                                onChange={changeFileHandler}
                                className="mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-gray-700 file:bg-gray-100 hover:file:bg-gray-200"
                            />
                            {input.file && (
                                <p className="text-sm text-gray-600 mt-2">Selected File: {input.file.name}</p>
                            )}
                        </div>

                        {/* Sign Up Button */}
                        <div>
                            {loading ? (
                                <Button className="w-full my-4" disabled>
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
                        <Toaster position="bottom-right" />
            
        </div>
    );
}

export default SignUp;
