'use client'

import * as React from 'react'
import { DayPicker } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/Button/Button'
import { MyxIcon } from '@/components/icons'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col space-y-4',
        month: 'space-y-4',
        caption: 'flex justify-between items-center pt-1 px-4',
        caption_label: 'text-lg font-semibold text-center',
        nav: 'flex space-x-2 items-center',
        nav_button: cn(buttonVariants({ variant: 'outline' }), 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'),
        nav_button_previous: 'left-1',
        nav_button_next: 'right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'grid grid-cols-7 gap-2 mb-2',
        head_cell: 'text-muted-foreground text-lg font-semibold w-full text-center',
        row: 'grid grid-cols-7 gap-2 w-full',
        cell: 'h-10 w-full text-center text-lg p-0 relative',
        day: cn(buttonVariants({ variant: null }), 'h-10 w-10 p-0 font-normal rounded-full hover:bg-gray-200'),
        day_range_end: 'day-range-end',
        day_selected: 'bg-red-500 text-white hover:bg-red-600 rounded-full',
        day_today: 'bg-blue-200 text-blue-900',
        day_outside: 'text-gray-400 opacity-50',
        day_disabled: 'text-gray-400 opacity-30',
        day_range_middle: 'bg-red-300 text-red-700',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <svg {...props} width='14' height='14' fill='currentColor' viewBox='0 0 24 24'>
            <path d='M15 19l-7-7 7-7' />
          </svg>
        ),
        IconRight: ({ ...props }) => (
          <svg {...props} width='14' height='14' fill='currentColor' viewBox='0 0 24 24'>
            <path d='M9 19l7-7-7-7' />
          </svg>
        ),
      }}
      {...props}
    />
  )
}

export default Calendar
Calendar.displayName = 'Calendar'

export { Calendar }
