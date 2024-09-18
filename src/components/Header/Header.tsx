import Image from 'next/image'
import React from 'react'
import Navigation from '../Navigation/Navigation'

const Header = () => {
  return (
    <div className='bg-primary-black flex flex-col gap-6 items-center justify-center w-full h-[224px]'>
      <div>
        <Image src={'/images/site-logo.png'} alt='logo' width={220} height={50} />
      </div>
      <Navigation />
    </div>
  )
}

export default Header
