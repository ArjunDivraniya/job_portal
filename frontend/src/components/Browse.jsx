import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './shared/Navbar';
import Job from './Job';
import { setSearchedQuery } from '../redux/jobSlice.js';
import useGetAllJobs from '../hooks/useGetAllJobs.jsx';

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(''));
    };
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className='max-w-7xl mx-auto my-10'>
        <h1 className='font-bold text-xl my-1'>Search Results ({allJobs.length})</h1>
        <div className="grid grid-cols-3 gap-4">
          {
            allJobs.map((job) => (
              <Job key={job} />
            ))
          }

        </div>
      </div>
    </>
  )
}

export default Browse