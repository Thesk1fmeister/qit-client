import AuthLayout from '@/components/layouts/AuthLayout'
import React from 'react'
import AuthForm from './components/AuthForm/AuthForm'
import { Toaster } from 'react-hot-toast'
import { Providers } from '@/redux/provider'

const AuthPage = () => {
  return (
    <Providers>
      <Toaster />
      <AuthLayout title='Welcome back!' subtitle='Please enter your details.' bgImage='/images/auth-bg.webp'>
        <AuthForm />
      </AuthLayout>
    </Providers>
  )
}

export default AuthPage
