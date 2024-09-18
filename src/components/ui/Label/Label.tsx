import React from 'react'
import { cn } from '@/lib/utils'

type TLabelProps = {
  className?: string
  text: string
  required?: boolean
}
const Label = ({ className, text, required = false }: TLabelProps) => {
  return (
    <label className={cn('text-base font-semibold text-secondary-black', className)}>
      {text}
      {required && <span className='text-red-500 ml-[3px]'>*</span>}
    </label>
  )
}

export default Label
