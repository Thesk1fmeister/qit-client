import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getUser, getUserRole } from '@/redux/slices/user/selectors'
import { usePathname, useRouter } from 'next/navigation'

const withAdminProtection = (WrappedComponent: React.ComponentType) => {
  const WithAdminProtection = (props: any) => {
    const role = useSelector(getUserRole)
    const profile = useSelector(getUser)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
      if (role !== 'admin') {
        router.replace('/')
      }
    }, [role, profile, pathname])

    if (role !== 'admin') {
      return null
    }

    return <WrappedComponent {...props} />
  }

  WithAdminProtection.displayName = `withAdminProtection(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`

  return WithAdminProtection
}

export default withAdminProtection
