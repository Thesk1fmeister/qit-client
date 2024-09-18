import React from 'react'
import { Providers } from '@/redux/provider'
import { Toaster } from 'react-hot-toast'
import AuthLayout from '@/components/layouts/AuthLayout'
import RegistrationForm from '../components/RegistrationForm/RegistrationForm'

const RegistrationPage = () => {
  return (
    <Providers>
      <Toaster />
      <AuthLayout title='Welcome to MYX BLEND BAR' bgImage='/images/registration-bg.webp'>
        <RegistrationForm />
      </AuthLayout>
    </Providers>
  )
}

export default RegistrationPage
