import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, Box } from '@mui/material';
import { setSearchedQuery } from '../redux/jobSlice'; // Adjust import path if needed

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42k-1lakh", "1lakh-5lakh"]
  }
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  // Handle the change of filter value
  const changeHandler = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    // Dispatch the selected filter value whenever it changes
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3' />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {filterData.map((filter, index) => (
          <FormControl key={index} sx={{ marginBottom: 2 }}>
            <FormLabel id={`${filter.filterType}-label`} sx={{ fontWeight: 'bold' }}>
              {filter.filterType}
            </FormLabel>
            <RadioGroup
              aria-labelledby={`${filter.filterType}-label`}
              name={`${filter.filterType}-group`}
              value={selectedValue}
              onChange={changeHandler}
            >
              {filter.array.map((item, i) => (
                <FormControlLabel
                  key={i}
                  value={item}
                  control={<Radio />}
                  label={item}
                />
              ))}
            </RadioGroup>
          </FormControl>
        ))}
      </Box>
    </div>
  );
};

export default FilterCard;
