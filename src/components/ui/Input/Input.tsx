import * as React from 'react'

import { cn } from '@/lib/utils'
import { error } from 'console'
import { FieldError } from 'react-hook-form'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError | undefined
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, error, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-[42px] w-full rounded-md border border-input bg-background px-3 py-3 text-base outline-none focus:outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-300 focus-visible:outline-none checked:bg-red-500 checked:border-transparent disabled:cursor-not-allowed disabled:opacity-50 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm',
        error && 'border-red-500',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = 'Input'

export { Input }
