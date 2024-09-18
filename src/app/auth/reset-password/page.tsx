'use client'
import CustomToaster from '@/components/CustomToaster/CustomToaster'
import AuthLayout from '@/components/layouts/AuthLayout'
import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import Label from '@/components/ui/Label/Label'
import { Providers } from '@/redux/provider'
import { TResetPassword } from '@/types/types'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import ClipLoader from 'react-spinners/ClipLoader'
import { useLoginMutation, useResetMutation } from '@/api/Auth'
import { MyxIcon } from '@/components/icons'

const ResetPasswordPage = () => {
  const [reset, { isLoading: resetLoading, isSuccess }] = useResetMutation()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  })

  const onSubmit = async (data: any) => {
    try {
      await reset(data).unwrap()
    } catch (err: any) {
      toast(t => (
        <CustomToaster
          variant='error'
          message={`Failed: ${err.data.detail ? err.data?.detail : 'Something went wrong'}`}
          dismiss={() => toast.dismiss(t.id)}
        />
      ))
      console.error('Failed to reset password: ', err)
    }
  }

  return (
    <Providers>
      <Toaster />
      <AuthLayout
        title='Reset your password'
        subtitle={!isSuccess ? 'Enter your email address and we`ll send you a link to reset your password.' : ''}
        bgImage='/images/auth-bg.webp'
      >
        {!isSuccess ? (
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col gap-1'>
                <Label text='Email' />
                <Input
                  placeholder='Please enter your e-mail'
                  type='email'
                  id='email'
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email address',
                    },
                    validate: value => {
                      const noCyrillic = /^[^\u0400-\u04FF]+$/.test(value)
                      return noCyrillic || 'Email must not contain Cyrillic characters'
                    },
                  })}
                  className={`mt-1 block w-full px-3 py-2 border border-gray-300
                 rounded-md shadow-sm focus:outline-none sm:text-sm ${errors.email ? 'border-red-500' : ''}`}
                />
                {/* @ts-ignore */}
                {errors.email && <span className='text-red-500 text-xs'>{errors?.email?.message}</span>}
              </div>
              <Button type='submit' disabled={!isValid} className='!bg-primary-black'>
                {resetLoading ? <ClipLoader size={24} color={'#fff'} /> : 'Continue'}
              </Button>
            </div>
          </form>
        ) : (
          <div className='bg-secondary-white p-4 rounded-md'>
            <div className='flex items-center gap-2'>
              <MyxIcon name='mail' className='w-[20px] h-[16px]' />
              <div>
                <strong>Password reset link sent</strong>
              </div>
            </div>
            <p>Please check your email to reset your password.</p>
            <div className='mt-4'>
              <span>Didn&apos;t receive it? </span>
              <button className='text-primary-blue underline' onClick={() => handleSubmit(onSubmit)()}>
                Send again
              </button>
            </div>
          </div>
        )}
      </AuthLayout>
    </Providers>
  )
}

export default ResetPasswordPage
