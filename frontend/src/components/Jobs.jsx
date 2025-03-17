import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Box, Card, CardContent } from '@mui/material';
import axios from 'axios';
import { setSearchedQuery } from '../redux/jobSlice';
import Navbar from './shared/Navbar';

const filterData = [
  { filterType: "Job Type", array: ["Remote", "Hybrid", "On-Site"] },
  { filterType: "Location", array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"] },
  { filterType: "Industry", array: ["Frontend Developer", "Backend Developer", "FullStack Developer"] },
  { filterType: "Salary", array: ["0-40k", "42k-1lakh", "1lakh-5lakh"] },
  { filterType: "Experience Level", array: ["Fresher", "Mid-Level", "Senior"] },
  { filterType: "Company Size", array: ["1-10", "11-50", "51-200", "201-500", "500+"] },
  { filterType: "Requirements", array: ["JavaScript", "Python", "React", "Node.js", "MongoDB"] }
];

const JobFilters = () => {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const changeHandler = (filterType, value) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (updatedFilters[filterType]?.includes(value)) {
        updatedFilters[filterType] = updatedFilters[filterType].filter((item) => item !== value);
        if (updatedFilters[filterType].length === 0) delete updatedFilters[filterType];
      } else {
        updatedFilters[filterType] = [...(updatedFilters[filterType] || []), value];
      }
      return updatedFilters;
    });
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedFilters));
    fetchJobs();
  }, [selectedFilters, dispatch]);

  const fetchJobs = async () => {
    const queryParams = new URLSearchParams({
        jobType: selectedFilters['Job Type']?.join(',') || '',
        companySize: selectedFilters['Company Size']?.join(',') || '',
        salaryRange: selectedFilters['Salary']?.join(',') || '',
        experienceLevel: selectedFilters['Experience Level']?.join(',') || '',
        requirements: selectedFilters['Requirements']?.join(',') || '',
        location: selectedFilters['Location']?.join(',') || '',
    }).toString();

    try {
        const response = await fetch(`http://localhost:5174/api/v1/jobs/getfilteredjobs?${queryParams.toString()}`);
        const data = await response.json();

        if (data.success) {
            setJobs(data.jobs);
        } else {
            console.error('Error fetching jobs:', data.message);
        }
    } catch (error) {
        console.error('Error fetching jobs:', error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className='grid grid-cols-1 md:grid-cols-4 gap-6 p-6'>
      <div className='col-span-1 bg-white p-4 shadow-lg rounded-lg border border-gray-200'>
        <h1 className='font-bold text-lg'>Filter Jobs</h1>
        <hr className='mt-3 mb-4' />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {filterData.map((filter, index) => (
            <FormControl key={index} sx={{ marginBottom: 2 }}>
              <FormLabel sx={{ fontWeight: 'bold' }}>{filter.filterType}</FormLabel>
              <FormGroup>
                {filter.array.map((item, i) => (
                  <FormControlLabel
                    key={i}
                    control={
                      <Checkbox
                        checked={selectedFilters[filter.filterType]?.includes(item) || false}
                        onChange={() => changeHandler(filter.filterType, item)}
                      />
                    }
                    label={item}
                  />
                ))}
              </FormGroup>
            </FormControl>
          ))}
        </Box>
      </div>

      <div className='col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {loading ? (
          <p>Loading jobs...</p>
        ) : jobs.length > 0 ? (
          jobs.map((job) => (
            <Card key={job.id} className='rounded-lg shadow-md border border-gray-200 p-4 h-60'>
              <CardContent>
                <h2 className='text-xl font-bold'>{job.title}</h2>
                <p className='text-gray-500'>{job.company}</p>
                <p className='text-blue-500'>{job.location}</p>
                <p className='text-green-500'>💰 Salary: ₹{job.salary?.toLocaleString() || 'N/A'}</p>
                <p className='text-purple-500'>📚 Requirements: {job.requirements?.join(', ') || 'N/A'}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className='text-red-500'>No jobs found based on selected filters.</p>
        )}
      </div>
    </div>
    </>
  );
};

export default JobFilters;
