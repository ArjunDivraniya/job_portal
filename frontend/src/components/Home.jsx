import React, { useEffect } from 'react'
import Navbar from './shared/Navbar.jsx'
import HeroSection from './HeroSection.jsx'
import Carousel from './CategoryCarousel.jsx'
import LatestJobs from './LatestJobs.jsx'
import Footer from './shared/Footer.jsx'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useGetAllAdminJobs from '../hooks/useGetAllAdminJobs.jsx'
import  RecommendedJobs  from './recommended.jsx'
import { Typography } from '@mui/material';

function Home() {
  useGetAllAdminJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') { 
    navigate("/admin/companies")}
  }, []);

  return (
    <>
      <Navbar />
      <HeroSection />
      <Carousel />
      <LatestJobs />
 
      <div className="App">
      <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}>
      <span style={{ color: '#9C27B0' }}>Recommended  </span>
      Jobs for Students
    </Typography>
            <RecommendedJobs />
        </div>

      <Footer />
    </>
  )
}

export default Home
