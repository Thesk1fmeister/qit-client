'use client'
import { useParams, useRouter } from 'next/navigation' // Або useSearchParams, якщо ви використовуєте нову навігацію Next.js
import CustomToaster from '@/components/CustomToaster/CustomToaster'
import AuthLayout from '@/components/layouts/AuthLayout'
import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import Label from '@/components/ui/Label/Label'
import { Providers } from '@/redux/provider'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import ClipLoader from 'react-spinners/ClipLoader'
import { MyxIcon } from '@/components/icons'
import { useConfirmPasswordMutation } from '@/api/Auth'
import Link from 'next/link'

const SetNewPassword = () => {
  const { uid } = useParams()
  const [confirmPassword, { isLoading: setLoading, isSuccess }] = useConfirmPasswordMutation()
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<any>({
    mode: 'onChange',
  })

  const onSubmit = async (data: { new_password: string }) => {
    try {
      const payload = {
        uid: uid,
        new_password: data.new_password,
      }
      await confirmPassword(payload).unwrap()
      toast(t => (
        <CustomToaster variant='success' message={'Password has been successfully updated'} dismiss={() => toast.dismiss(t.id)} />
      ))
    } catch (err: any) {
      toast(t => (
        <CustomToaster
          variant='error'
          message={`Failed: ${err.data.detail ? err.data?.detail : 'Something went wrong'}`}
          dismiss={() => toast.dismiss(t.id)}
        />
      ))
      console.error('Failed to set new password: ', err)
    }
  }

  return (
    <Providers>
      <Toaster />
      <AuthLayout
        title='Set new password'
        subtitle='Enter your new password below to regain access to your account.'
        bgImage='/images/auth-bg.webp'
      >
        {!isSuccess ? (
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <div className='flex flex-col gap-6'>
              {/* Поле пароля */}
              <div className='flex flex-col gap-1'>
                <Label text='Password' />
                <div className='relative'>
                  <Input
                    placeholder='Please enter your password'
                    type={showPassword ? 'text' : 'password'}
                    id='new_password'
                    {...register('new_password', {
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters long',
                      },
                    })}
                    className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm ${
                      errors.new_password ? 'border-red-500' : ''
                    }`}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(prev => !prev)}
                    className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
                  >
                    {showPassword ? <MyxIcon name='eye' /> : <MyxIcon name='eyeOff' />}
                  </button>
                </div>
                {/* @ts-ignore */}
                {errors.new_password && <span className='text-red-500 text-xs'>{errors.new_password.message}</span>}
              </div>

              {/* Повторіть пароль */}
              <div className='flex flex-col gap-1'>
                <Label text='Repeat password' />
                <div className='relative'>
                  <Input
                    placeholder='Please enter your password'
                    type={showRepeatPassword ? 'text' : 'password'}
                    id='repeat_password'
                    {...register('repeat_password', {
                      required: 'Please repeat your password',
                      validate: value => value === watch('new_password') || 'Passwords do not match',
                    })}
                    className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm ${
                      errors.repeat_password ? 'border-red-500' : ''
                    }`}
                  />
                  <button
                    type='button'
                    onClick={() => setShowRepeatPassword(prev => !prev)}
                    className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
                  >
                    {showRepeatPassword ? <MyxIcon name='eye' /> : <MyxIcon name='eyeOff' />}
                  </button>
                </div>
                {/* @ts-ignore */}
                {errors.repeat_password && <span className='text-red-500 text-xs'>{errors.repeat_password.message}</span>}
              </div>

              <Button type='submit' disabled={!isValid} className='!bg-primary-black'>
                {setLoading ? <ClipLoader size={24} color={'#fff'} /> : 'Set new password'}
              </Button>
            </div>
          </form>
        ) : (
          <>
            <div className='bg-secondary-lightGreen p-4 rounded-md'>
              <div className='flex items-center gap-2'>
                <div>
                  <strong>Password reset successful</strong>
                </div>
              </div>
              <p>Your password has been updated successfully.</p>
            </div>
            <Button className='w-full'>
              <Link href={'/auth'}>Go to Sign In</Link>
            </Button>
          </>
        )}
      </AuthLayout>
    </Providers>
  )
}

export default SetNewPassword
