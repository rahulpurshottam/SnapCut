import React from 'react'
import Hero from '../components/Hero'
import Steps from '../components/Steps'
import Slider from '../components/Slider'
import Testimonials from '../components/Testimonials'

const Home = () => {
  return (
    <div>
        <Hero/>
        <Steps/>
        <Slider/>
        <Testimonials/>
    </div>
  )
}

export default Home