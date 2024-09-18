import React, { Children } from 'react'
import {
  AlertDialogAction,
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/AlertDialog/Alert-Dialog'
import clsx from 'clsx'

type TConfirmAlertProps = {
  trigger?: string
  description?: string
  children: React.ReactNode
  submit: () => void
  title: string
  submitText: string
  showCheckbox?: boolean
}

const ConfirmAlert = ({
  trigger,
  children,
  submit,
  description,
  title,
  submitText,
  showCheckbox = false,
}: TConfirmAlertProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className='flex gap-2'>
        {children}
        {trigger}
      </AlertDialogTrigger>
      <AlertDialogContent
        className={
          'flex flex-col gap-8 sm:right-0 sm:left-0 sm:top-auto sm:bottom-0 sm:transform-none sm:max-w-full sm:items-center'
        }
      >
        <AlertDialogHeader>
          <AlertDialogTitle className={clsx('text-base sm:text-center', { '!text-left font-semibold': showCheckbox })}>
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className={clsx('text-base sm:text-center', { '!text-left !mt-6': showCheckbox })}>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {showCheckbox && (
          <div className='flex gap-2 items-center'>
            <input
              type='checkbox'
              id='remember'
              className='peer h-5 w-5 shrink-0 rounded border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-secondary-black data-[state=checked]:text-white'
            />
            <div>Charge customer a no-show fee of $10.00</div>
          </div>
        )}
        <AlertDialogFooter className={'flex flex-row gap-4 justify-center sm:w-full'}>
          <AlertDialogCancel className={clsx('sm:w-full', { 'w-1/2': showCheckbox })}>Cancel</AlertDialogCancel>
          <AlertDialogAction className={clsx('sm:w-full', { 'w-1/2': showCheckbox })} onClick={submit}>
            {submitText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ConfirmAlert
