import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { MyxIcon } from '../icons'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { getUser } from '@/redux/slices/user/selectors'
import { TProfileDetails } from '@/types/types'

const ProfilePreview = () => {
  const profile = useSelector(getUser)
  const [user, setUser] = useState<TProfileDetails | null>(null)

  useEffect(() => {
    if (profile) {
      setUser(profile)
    }
  }, [profile])
  const avatar = user?.avatar || '/images/profile-placeholder.png'
  const name = user?.first_name || 'User'

  return (
    <div className='flex flex-col items-center h-20 w-20 gap-1'>
      <div className='relative'>
        <Link href={'/profile'}>
          <Image width={64} height={64} src={avatar} alt='Avatar' className='rounded-full object-cover w-16 h-16' />
          <div className='w-6 h-6 absolute bottom-0 right-0 bg-white text-primary-black rounded-full flex items-center justify-center cursor-pointer'>
            <MyxIcon name='edit' width={16} height={16} />
          </div>
        </Link>
      </div>
      <div>
        <p className='font-semibold text-secondary-white text-center text-sm'>{name}</p>
      </div>
    </div>
  )
}

export default ProfilePreview
