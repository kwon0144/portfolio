import React from 'react'
import StarBackground from '../components/StarBackground'
import Navbar from '../components/Navbar'

const NotFound = () => {
  return (
    <div className='min-h-screen bg-background text-foreground overflow-x-hidden'>

      {/* Background Effects */}
      <StarBackground />

      {/* Navbar */}
      <Navbar />
      <div className='py-24 px-4 relative'>
        Page Not Found
      </div>
    </div>
  )
}

export default NotFound