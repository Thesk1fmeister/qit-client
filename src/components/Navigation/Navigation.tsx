import React from 'react'
import { navigationLinks } from '@/constants/navigation'
import Link from 'next/link'

const Navigation = () => {
  return (
    <div className='flex gap-2 text-secondary-white'>
      <ul className='flex gap-4'>
        {navigationLinks.map(item => (
          <li key={item.name} className='uppercase font-bold'>
            <Link href={item.link}>{item.name}</Link>
          </li>
        ))}
      </ul>
      {/* <div>social</div> */}
    </div>
  )
}

export default Navigation
