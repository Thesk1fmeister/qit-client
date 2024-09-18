'use client'
import * as React from 'react'
// import { CalendarIcon } from '@radix-ui/react-icons'
import { addDays, format } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/Calendar/Calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover/Popover'
import { Button } from '../ui/Button/Button'
import { MyxIcon } from '../icons'

export function DatePickerWithRange({
  className,
  setDatePeriod,
}: React.HTMLAttributes<HTMLDivElement> & {
  setDatePeriod: (dates: { startDate: string | null; endDate: string | null }) => void
}) {
  const [date, setDate] = React.useState<DateRange | undefined>(undefined)

  const handleSelectDate = (range: DateRange | undefined) => {
    setDate(range)
    if (range?.from) {
      setDatePeriod({
        startDate: format(range.from, 'yyyy-MM-dd'),
        endDate: range.to ? format(range.to, 'yyyy-MM-dd') : null,
      })
    } else {
      setDatePeriod({ startDate: null, endDate: null })
    }
  }

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outlineGray'}
            className={cn(
              'min-w-[260px] h-[42px] border border-gray-100 w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            {!date?.from && <MyxIcon name='calendar' width={18} height={18} className='w-[18px] h-[18px]' />}
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span className='pl-[14px]'>Select date period</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelectDate}
            numberOfMonths={2}
            className='bg-white'
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
