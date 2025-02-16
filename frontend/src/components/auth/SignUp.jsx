import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Link } from 'react-router-dom';

function SignUp() {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
    role: "",
  });

  const [userType, setUserType] = useState('student');
  const [profilePic, setProfilePic] = useState(null);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  // Handle radio button change
  const handleRadioChange = (event) => {
    setUserType(event.target.value);
  };

  // Handle file change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')) {
      setProfilePic(file);
    } else {
      alert('Please upload a valid image file (PNG, JPG, JPEG).');
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    if (input.password !== input.confirm_password) {
      alert('Passwords do not match.');
      return;
    }

    if (!input.fullname || !input.email || !input.phone || !input.password || !input.confirm_password) {
      alert('Please fill in all the fields.');
      return;
    }

    // You can now handle the form data, e.g., send it to an API
    console.log('Form Submitted:', input);
    alert('Account created successfully!');
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
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                type="submit"
              >
                Sign Up
              </Button>
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
