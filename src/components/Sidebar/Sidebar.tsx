import { sidebarLinks } from '@/constants/sidebar'
import Image from 'next/image'
import React from 'react'
import { MyxIcon } from '../icons'
import ConfirmAlert from '../ConfirmAlert/ConfirmAlert'
import { storageKeys } from '@/constants/storage'
import { removeFromStorage } from '@/utils/storage'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

const Sidebar = () => {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    removeFromStorage(storageKeys.AUTH)
    router.push('/auth')
  }
  return (
    <aside className='flex max-w-[238px] w-full flex-col min-h-screen justify-between border-r border-secondary-light-grey'>
      <div className='flex flex-col gap-4 pr-6'>
        {sidebarLinks.map(item => {
          const isActive = pathname === item.link

          return (
            <Link href={item.link} key={item.name} className='flex w-full items-center gap-3'>
              <Image width={44} height={44} src={item.image} alt='logo' />
              <div className={`text-lg ${isActive ? 'font-bold text-primary-black' : 'text-primary-black'}`}>{item.name}</div>
            </Link>
          )
        })}
      </div>
      <div className='flex gap-3 text-secondary-site-grey items-center'>
        <ConfirmAlert submitText='Yes, log out' title='Are you sure you want to log out?' submit={handleLogout}>
          <div className='flex items-center gap-3 cursor-pointer'>
            <div className='p-[13px]'>
              <MyxIcon name='logout' />
            </div>
            <div className='text-lg'>Log out</div>
          </div>
        </ConfirmAlert>
      </div>
    </aside>
  )
}

export default Sidebar
