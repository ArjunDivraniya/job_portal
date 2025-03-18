import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Box } from '@mui/material';
import { setSearchedQuery } from '../redux/jobSlice';

const filterData = [
  { filterType: "Job Type", array: ["Remote", "Hybrid", "On-Site"] },
  { filterType: "Location", array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"] },
  { filterType: "Industry", array: ["Frontend Developer", "Backend Developer", "FullStack Developer"] },
  { filterType: "Salary", array: ["0-40k", "42k-1lakh", "1lakh-5lakh"] },
  { filterType: "Experience Level", array: ["Fresher", "Mid-Level", "Senior"] },
  { filterType: "Company Size", array: ["1-10", "11-50", "51-200", "201-500", "500+"] },
  { filterType: "Tech Stack", array: ["JavaScript", "Python", "React", "Node.js", "MongoDB"] }
];

const FilterCard = () => {
  const [selectedFilters, setSelectedFilters] = useState({});
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
  }, [selectedFilters, dispatch]);

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
  );
};

export default FilterCard;
