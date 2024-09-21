'use client'
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-base font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-gray-200 sm:text-sm sm:py-[8.5px] sm:px-[18px]',
  {
    variants: {
      variant: {
        default: 'bg-primary-black text-white',
        outline: 'bg-background ring-1 ring-primary-red text-primary-red',
        outlineBlack: 'bg-background text-black border border-primary-black',
        blackUnderline: 'border-0 bg-background text-black underline underline-offset-4',
        outlineGray: 'border border-gray-100 text-gray-300',
        light: 'border border-gray-300 text-gray-300 hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-[50px] px-4 py-3',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
