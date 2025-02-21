import React from 'react'
import Navbar from './shared/Navbar.jsx'
import HeroSection from './HeroSection.jsx'
import Carousel from './CategoryCarousel.jsx'
import LatestJobs from './LatestJobs.jsx'
import Footer from './shared/Footer.jsx'
import useGetAllJobs from '../hooks/useGetAllJobs.jsx'

function Home() {
  useGetAllJobs();
  return (
    <>
      <Navbar />
      <HeroSection />
      <Carousel />
      <LatestJobs />
      <Footer />
    </>
  )
}

export default Home
