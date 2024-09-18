import { usePatchProfileMutation } from '@/api/Auth'
import CustomToaster from '@/components/CustomToaster/CustomToaster'
import { MyxIcon } from '@/components/icons'
import { Button } from '@/components/ui/Button/Button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/Dialog/Dialog'
import { Input } from '@/components/ui/Input/Input'
import Label from '@/components/ui/Label/Label'
import { TPasswordChange } from '@/types/types'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import ClipLoader from 'react-spinners/ClipLoader'

type TResetDialogProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title: string
  label: string
}
const ResetDialog = ({ open, setOpen, title, label }: TResetDialogProps) => {
  const [patchProfile, { isLoading }] = usePatchProfileMutation()
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const {
    register,
    reset,
    control,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<TPasswordChange>({
    defaultValues: {
      old_password: '',
      new_password: '',
      password: '',
    },
    mode: 'onChange',
  })

  const handleClose = () => {
    reset()
    setShowPassword(false)
    setShowNewPassword(false)
    setShowConfirmPassword(false)
    setOpen(false)
  }
  const onSubmit = async (data: any) => {
    delete data.new_password
    try {
      await patchProfile(data).unwrap()
      handleClose()
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
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className='px-10 pt-10 flex flex-col gap-6 sm:translate-y-0 h-auto sm:max-h-max overflow-y-scroll sm:left-0 sm:top-auto sm:bottom-0 sm:transform-none sm:max-w-full sm:items-center sm:px-4 pb-4 pt-8'>
        <DialogHeader className='text-left'>
          <DialogTitle className='text-2xl'>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 sm:w-full'>
          <div className='flex flex-col gap-1'>
            <Label text='Current Password' />
            <div className='relative'>
              <Input
                placeholder='Please enter your password'
                type={showPassword ? 'text' : 'password'}
                id='old_password'
                maxLength={20}
                {...register('old_password', {
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
                    return true
                  },
                })}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300
                   rounded-md shadow-sm focus:outline-none sm:text-sm ${errors.old_password ? 'border-red-500' : ''}`}
              />
              <button
                type='button'
                onClick={() => setShowPassword(prev => !prev)}
                className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
              >
                {showPassword ? <MyxIcon name='eye' width={16} height={16} /> : <MyxIcon name='eyeOff' width={16} height={16} />}
              </button>
            </div>
            {errors.old_password && <span className='text-system-error text-xs'>{errors?.old_password?.message}</span>}
          </div>
          <div className='flex flex-col gap-1'>
            <Label text='New Password' />
            <div className='relative'>
              <Input
                placeholder='Please enter new password'
                type={showNewPassword ? 'text' : 'password'}
                id='new_password'
                maxLength={20}
                {...register('new_password', {
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
                    return true
                  },
                })}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300
         rounded-md shadow-sm focus:outline-none sm:text-sm ${errors.new_password ? 'border-red-500' : ''}`}
              />
              <button
                type='button'
                onClick={() => setShowNewPassword(prev => !prev)}
                className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
              >
                {showNewPassword ? (
                  <MyxIcon name='eye' width={16} height={16} />
                ) : (
                  <MyxIcon name='eyeOff' width={16} height={16} />
                )}
              </button>
            </div>
            {errors.new_password && <span className='text-system-error text-xs'>{errors.new_password.message}</span>}
          </div>
          <div className='flex flex-col gap-1'>
            <Label text='Confirm Password' />
            <div className='relative'>
              <Input
                placeholder='Please confirm new password'
                type={showConfirmPassword ? 'text' : 'password'}
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
                    if (value !== getValues('new_password')) {
                      return 'Passwords do not match'
                    }
                    return true
                  },
                })}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300
         rounded-md shadow-sm focus:outline-none sm:text-sm ${errors.password ? 'border-red-500' : ''}`}
              />
              <button
                type='button'
                onClick={() => setShowConfirmPassword(prev => !prev)}
                className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
              >
                {showConfirmPassword ? (
                  <MyxIcon name='eye' width={16} height={16} />
                ) : (
                  <MyxIcon name='eyeOff' width={16} height={16} />
                )}
              </button>
            </div>
            {errors.password && <span className='text-system-error text-xs'>{errors.password.message}</span>}
          </div>
          <DialogFooter className='flex flex-row gap-4 items-end justify-end pt-4'>
            <DialogClose asChild className='sm:w-1/3'>
              <Button variant='outlineBlack'>Cancel</Button>
            </DialogClose>
            <Button type='submit' className='sm:w-2/3' disabled={!isValid || isLoading}>
              {isLoading ? <ClipLoader size={24} color={'#fff'} /> : `${label}`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ResetDialog
