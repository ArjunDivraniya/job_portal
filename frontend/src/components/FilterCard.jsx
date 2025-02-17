import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Box } from '@mui/material';  // Import Box component for layout

const filterData = [
  {
    filterType: "Location",
    arrya: ["Delhi NCR", "Bengalore", "Pune", "Mumbai", "Hyderabad"]
  },
  {
    filterType: "Industry",
    arrya: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    filterType: "Salary",
    arrya: ["0-40k", "42k-1lakh", "1lakh-5lakh"]
  }
];

function FilterCard() {
  return (
    <div>
      <h1>Filter Jobs</h1>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {filterData.map((filter, index) => (
          <FormControl key={index} sx={{ marginBottom: 2 }}>
            <FormLabel id={`${filter.filterType}-label`}>{filter.filterType}</FormLabel>
            <RadioGroup
              aria-labelledby={`${filter.filterType}-label`}
              defaultValue={filter.arrya[0]} // Default value based on the first option
              name={`${filter.filterType}-group`}
            >
              {filter.arrya.map((item, i) => (
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
}

export default FilterCard;
