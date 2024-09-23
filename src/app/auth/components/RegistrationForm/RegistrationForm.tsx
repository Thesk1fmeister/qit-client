'use client'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Input } from '@/components/ui/Input/Input'
import Label from '@/components/ui/Label/Label'
import { Button } from '@/components/ui/Button/Button'
import { useGoogleAuthMutation, useSignupMutation } from '@/api/Auth'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { TRegisterForm } from '@/types/types'
import ClipLoader from 'react-spinners/ClipLoader'
import { MyxIcon } from '@/components/icons'
import CustomToaster from '@/components/CustomToaster/CustomToaster'
import Link from 'next/link'
import { MaskedInput } from 'antd-mask-input'
import { baseURL } from '@/api/baseUrl'

const RegistrationForm = () => {
  const router = useRouter()
  const [signup, { isLoading: loginLoading }] = useSignupMutation()
  const [googleAuth, { isLoading: googleLoading }] = useGoogleAuthMutation()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid },
  } = useForm<TRegisterForm>({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      phone: '',
    },
    mode: 'onChange',
  })

  const password = watch('password')

  const onSubmit = async (data: any) => {
    try {
      await signup(data).unwrap()
      router.push('/auth')
    } catch (err: any) {
      toast(t => (
        <CustomToaster
          variant='error'
          message={`Failed: ${err.data.detail ? err.data?.detail : 'Something went wrong'}`}
          dismiss={() => toast.dismiss(t.id)}
        />
      ))
      console.error('Failed to register: ', err)
    }
  }

  const handleGoogleSignup = async () => {
    router.push(`${baseURL}accounts/google/login/?next=`)
  }

  const handleFacebookSignup = async () => {
    router.push(`${baseURL}accounts/facebook/login/?next=`)
  }

  return (
    <div className='flex flex-col gap-4'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col gap-1'>
            <Label text='Name' />
            <Input
              error={errors.first_name}
              placeholder='Please enter your name'
              type='first_name'
              id='first_name'
              {...register('first_name', {
                required: 'First name is required',
                minLength: {
                  value: 2,
                  message: 'First name must be at least 2 characters long',
                },
                maxLength: {
                  value: 30,
                  message: 'First name must be no longer than 30 characters',
                },
                pattern: {
                  value: /^[^\s](.*[^\s])?$/,
                  message: 'First name cannot start or end with a space',
                },
              })}
            />
          </div>
          <div className='flex flex-col gap-1'>
            <Label text='Last name' />
            <Input
              error={errors.first_name}
              placeholder='Please enter your name'
              type='last_name'
              id='last_name'
              {...register('last_name', {
                required: 'Last name is required',
                minLength: {
                  value: 2,
                  message: 'First name must be at least 2 characters long',
                },
                maxLength: {
                  value: 30,
                  message: 'First name must be no longer than 30 characters',
                },
                pattern: {
                  value: /^[^\s](.*[^\s])?$/,
                  message: 'First name cannot start or end with a space',
                },
              })}
            />
          </div>
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
            {errors.email && <span className='text-red-500 text-xs'>{errors.email.message}</span>}
          </div>
          <div className='flex flex-col gap-1'>
            <Label text='Phone' />
            <Controller
              name='phone'
              control={control}
              rules={{
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9+\s()-]+$/,
                  message:
                    'Please enter a valid phone number containing only numbers, spaces, parentheses, dashes, and the plus sign',
                },
                maxLength: {
                  value: 20,
                  message: 'Phone number must be at most 20 characters long',
                },
              }}
              render={({ field }) => (
                <MaskedInput
                  {...field}
                  mask='+000 000 000 0000'
                  placeholder='+xxx (xxx) xxx-xxxx'
                  id='phone'
                  type='text'
                  className='flex h-[50px] w-full rounded-md border px-3 py-3 text-base outline-none mt-1 border-gray-300 focus:outline-none focus-visible:outline-none focus:border-none'
                />
              )}
            />
          </div>
          <div className='flex flex-col gap-1'>
            <Label text='Password' />
            <div className='relative'>
              <Input
                placeholder='Please enter your password'
                type={showPassword ? 'text' : 'password'}
                id='password'
                maxLength={20}
                {...register('password', {
                  required: 'Password is required',
                  maxLength: {
                    value: 20,
                    message: 'Password must be less than 20 characters',
                  },
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                  validate: value => {
                    if (!/[^\u0400-\u04FF]/.test(value)) {
                      return 'Please verify that you are entering the correct password.'
                    }
                    if (/\s/.test(value)) {
                      return 'Password must not contain spaces'
                    }
                    if (!/[A-Z]/.test(value)) {
                      return 'Password must contain at least one uppercase letter'
                    }
                    if (!/[0-9]/.test(value)) {
                      return 'Password must contain at least one number'
                    }
                    if (!/[!@*]/.test(value)) {
                      return 'Password must contain at least one symbol (!@*)'
                    }
                    return true
                  },
                })}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300
                     rounded-md shadow-sm focus:outline-none sm:text-sm ${errors.password ? 'border-red-500' : ''}`}
              />
              <button
                type='button'
                onClick={() => setShowPassword(prev => !prev)}
                className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
              >
                {showPassword ? <MyxIcon name='eye' width={16} height={16} /> : <MyxIcon name='eyeOff' width={16} height={16} />}
              </button>
            </div>
            {password && (
              <ul className='mt-2 text-sm text-gray-600'>
                <li className={password.length >= 8 ? 'text-green-600' : 'text-red-600'}>
                  {password.length >= 8 ? '✓' : '✕'} use 8 or more characters
                </li>
                <li className={/[A-Z]/.test(password) ? 'text-green-600' : 'text-red-600'}>
                  {/[A-Z]/.test(password) ? '✓' : '✕'} use one English uppercase letter (A-Z)
                </li>
                <li className={/[0-9]/.test(password) ? 'text-green-600' : 'text-red-600'}>
                  {/[0-9]/.test(password) ? '✓' : '✕'} use at least one number (0-9)
                </li>
                <li className={/[!@*]/.test(password) ? 'text-green-600' : 'text-red-600'}>
                  {/[!@*]/.test(password) ? '✓' : '✕'} use at least one symbol (!@*)
                </li>
              </ul>
            )}
          </div>
          <div className='flex flex-col'>
            <Button type='submit' disabled={!isValid}>
              {loginLoading ? <ClipLoader size={24} color={'#fff'} /> : 'Sign Up'}
            </Button>
          </div>
          <div className='flex'>
            <p className='text-center'>
              With registration, you accept our{' '}
              <span>
                <Link className='text-system-primary' href={`/auth/register`}>
                  privacy policy
                </Link>
              </span>{' '}
              and{' '}
              <span>
                <Link className='text-system-primary' href={`/auth/register`}>
                  terms & conditions
                </Link>
              </span>
            </p>
          </div>
        </div>

        <div className='flex gap-4 flex-col items-center justify-center'>
          <div className='w-full flex items-center justify-center'>
            <div className='w-full border-b border-gray-300'></div>
            <div className='w-full flex items-center justify-center text-secondary-black px-[7px] py-0.5'>or Sign Up with</div>
            <div className='w-full border-b border-gray-300'></div>
          </div>
          <div className='flex items-center justify-center gap-4'>
            <Button type='button' variant={'outlineBlack'} className='size-8 p-2' onClick={handleFacebookSignup}>
              <MyxIcon name='facebook' width={16} height={16} />
            </Button>
            <Button type='button' variant={'outlineBlack'} className='size-8 p-2' onClick={handleGoogleSignup}>
              {googleLoading ? <ClipLoader size={16} color={'#000'} /> : <MyxIcon name='google' width={16} height={16} />}
            </Button>
          </div>
        </div>
      </form>
      <div className='flex gap-2 justify-center mt-[52px]'>
        Already have an account?
        <Link className='text-system-primary cursor-pointer' href={`/auth`}>
          Sign In
        </Link>
      </div>
    </div>
  )
}
export default RegistrationForm
