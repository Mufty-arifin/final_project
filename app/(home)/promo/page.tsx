import Footer from '@/components/home/Footer'
import Navbar from '@/components/home/Navbar'
import Breadcrumb from '@/components/home/promo/Breadcrumb'
import Hero from '@/components/home/promo/Hero'
import React from 'react'

const page = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Breadcrumb />
      <Footer />
    </>
  )
}

export default page