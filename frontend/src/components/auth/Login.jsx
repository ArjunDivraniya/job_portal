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

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [userType, setUserType] = useState('student');

  // Handle input change for email and password
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
    setInput({ ...input, role: event.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!input.email || !input.password) {
      alert('Please fill in both email and password.');
      return;
    }

    // Submit the form (you can replace this with actual form submission logic)
    console.log('Form Submitted:', input);
    alert('Login successful!');
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
          <h1 className="font-bold text-3xl text-center text-[#1876D1] mb-6">Login</h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
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

            {/* Radio Buttons for user type */}
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

            {/* Login Button */}
            <div>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                type="submit"
              >
                Login
              </Button>
            </div>

            {/* Sign Up link */}
            <div className="text-center text-sm text-gray-500 mt-4">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#1876D1] hover:text-[#1568B1]">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
