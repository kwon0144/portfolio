import React from 'react'

const Footer = () => {
  return (
    <footer className='border-t py-6'>
        <p className='text-xs text-muted-foreground text-foreground/80'>
            &copy; {new Date().getFullYear()} Kinsey Wong
        </p>
    </footer>
  )
}

export default Footer