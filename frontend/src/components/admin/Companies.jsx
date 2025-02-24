import React from 'react'
import Navbar from '../shared/Navbar'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Companies = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
    <TextField sx={{width:'fit'}} placeholder='Filter by name'>
    </TextField>
<Button>New Company</Button>
      </div>
    </>
  )
}

export default Companies
