'use client'
import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import Label from '@/components/ui/Label/Label'
import { TProfileDetails } from '@/types/types'
import { MaskedInput } from 'antd-mask-input'
import Image from 'next/image'
import React, { useRef, useState, ChangeEvent } from 'react'
import { Controller, useForm } from 'react-hook-form'
import ClipLoader from 'react-spinners/ClipLoader'
import ResetDialog from '../ResetPasswordDialog/ResetDialog'
import { usePatchAvatarMutation, usePatchProfileMutation } from '@/api/Auth'
import CustomToaster from '@/components/CustomToaster/CustomToaster'
import toast from 'react-hot-toast'

type TProfileContentProps = {
  initialData: TProfileDetails
}
const ProfileContent = ({ initialData }: TProfileContentProps) => {
  const [patchProfile, { isLoading }] = usePatchProfileMutation()
  const [patchAvatar] = usePatchAvatarMutation()

  const [isOpen, setIsOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const avatarSrc = selectedFile ? URL.createObjectURL(selectedFile) : initialData?.avatar

  const generateInitials = (firstName: string, secondName: string) => {
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : ''
    const secondInitial = secondName ? secondName.charAt(0).toUpperCase() : ''
    return `${firstInitial}${secondInitial}`
  }
  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TProfileDetails>({
    defaultValues: {
      first_name: initialData?.first_name || '',
      last_name: initialData?.last_name || '',
      email: initialData?.email || '',
      phone: initialData?.phone || '',
    },
    mode: 'onChange',
  })

  const isFormValid = () => {
    return !errors.first_name && !errors.last_name && !errors.email
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setSelectedFile(file || null)
  }

  const onSubmit = async (data: TProfileDetails) => {
    try {
      if (selectedFile) {
        const avatar = new FormData()
        avatar.append('avatar', selectedFile)
        await patchAvatar(avatar).unwrap()
      }
      delete data.avatar
      await patchProfile(data).unwrap()
      toast(t => (
        <CustomToaster
          variant='success'
          message={'Personal information successfully updated'}
          dismiss={() => toast.dismiss(t.id)}
        />
      ))
    } catch (err: any) {
      const errorMessage = err.data ? Object.values(err.data)[0] : 'Unknown error'
      toast(t => (
        <CustomToaster
          variant='error'
          message={`Failed to update personal information: ${errorMessage}`}
          dismiss={() => toast.dismiss(t.id)}
        />
      ))
    }
  }
  return (
    <>
      <ResetDialog title='Change Password' label='Save' open={isOpen} setOpen={setIsOpen} />
      <div className='w-full flex flex-col gap-6 border rounded-lg p-6'>
        <div className='flex justify-between items-center'>
          <h2 className='text-xl font-bold'>Personal Information</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <div className='h-[56px] flex gap-4 items-end'>
            {!initialData.avatar && !selectedFile ? (
              <div className='w-[56px] h-[56px] bg-gray-200 rounded-lg flex items-center justify-center'>
                <span className='text-white text-2xl font-bold'>
                  {generateInitials(initialData?.first_name, initialData?.last_name)}
                </span>
              </div>
            ) : (
              // @ts-ignore
              <Image src={avatarSrc} className='size-14 rounded object-cover' width={56} height={56} alt='Profile avatar' />
            )}

            <div className='cursor-pointer font-semibold text-system-primary' onClick={() => fileInputRef?.current?.click()}>
              Change profile photo
              <input
                type='file'
                onChange={handleFileChange}
                className='hidden'
                accept='image/*'
                id='file-input'
                ref={fileInputRef}
              />
            </div>
          </div>

          <div className='flex max-w-[711px] w-full flex-col gap-6'>
            <div className='flex flex-col gap-6 w-full sm:w-full'>
              <div className='flex gap-4 sm:flex-col'>
                <div className='w-full flex flex-col gap-1'>
                  <Label text='First name' required />
                  <Input
                    error={errors.first_name}
                    placeholder='Сustomer name'
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
                  {errors.first_name && <span className='text-red-500 text-xs'>{errors.first_name.message}</span>}
                </div>
                <div className='w-full flex flex-col gap-1'>
                  <Label text='Last name' required />
                  <Input
                    error={errors.last_name}
                    placeholder='Сustomer last name'
                    type='text'
                    id='last_name'
                    maxLength={20}
                    {...register('last_name', {
                      required: 'Last name is required',
                      minLength: {
                        value: 2,
                        message: 'Last name must be at least 2 characters long',
                      },
                      maxLength: {
                        value: 30,
                        message: 'Last name must be no longer than 30 characters',
                      },
                      pattern: {
                        value: /^[^\s](.*[^\s])?$/,
                        message: 'Last name cannot start or end with a space',
                      },
                    })}
                  />
                  {errors.last_name && <span className='text-system-error text-xs'>{errors.last_name.message}</span>}
                </div>
              </div>
              <div className='flex gap-4 sm:flex-col'>
                <div className='w-full flex flex-col gap-1'>
                  <Label text='E-mail' required />
                  <Input
                    error={errors.email}
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
                  />
                  {errors.email && <span className='text-red-500 text-xs'>{errors.email.message}</span>}
                </div>
                <div className='w-full flex flex-col gap-1'>
                  <Label text='Phone' />
                  <Controller
                    name='phone'
                    control={control}
                    render={({ field }) => (
                      <MaskedInput
                        {...field}
                        mask='+1 (000) 000-0000'
                        placeholder={'+1 (xxx) xxx-xxxx'}
                        id='phone'
                        type='text'
                        className='flex h-[50px] w-full rounded-md border px-3 py-3 text-base outline-none mt-1 border-gray-300 focus:outline-none focus-visible:outline-none focus:border-none'
                      />
                    )}
                  />
                </div>
              </div>
              <Button type='submit' className='w-[140px] sm:w-full' disabled={!isFormValid() || isLoading}>
                {isLoading ? <ClipLoader size={24} color={'#fff'} /> : 'Save changes'}
              </Button>
              <div className='flex justify-between items-center sm:flex-col sm:gap-6 sm:items-start'>
                <div className='flex flex-col'>
                  <div className='text-lg font-semibold'>Change Password</div>
                  <div className='text-sm'>Ensure the security of your account by regularly updating your password.</div>
                </div>
                <div>
                  <div onClick={() => setIsOpen(true)} className='cursor-pointer font-semibold text-system-primary'>
                    Change Password
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default ProfileContent
