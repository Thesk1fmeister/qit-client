import { useState } from 'react'
import { Calendar } from '../ui/Calendar/Calendar'
import { Button } from '../ui/Button/Button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/Dialog/Dialog'
import Label from '../ui/Label/Label'
import { RadioGroup, RadioGroupItem } from '../ui/RadioGroup/radio-group'
import { MyxIcon } from '../icons'
import { cn } from '@/lib/utils'

const ScheduleAppointment = ({ trigger }: { trigger: React.ReactNode }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [selectedTime, setSelectedTime] = useState('10:00 am')

  const times = ['10:00 am', '11:00 am', '12:00 pm', '01:00 pm', '02:00 pm', '03:00 pm', '04:00 pm']

  const handleUpdateAppointment = () => {
    console.log('Updating appointment:', selectedDate, selectedTime)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className='max-w-[728px] w-full px-[64px] h-auto'>
        <DialogHeader>
          <DialogTitle className='text-[32px]'>Schedule</DialogTitle>
          <div>
            Please select a new day and time for your service appointment. Ensure it fits your schedule to avoid further changes
          </div>
        </DialogHeader>
        <div className='flex gap-10'>
          {/* //@ts-ignore */}
          <Calendar selected={selectedDate} onSelect={setSelectedDate} className='w-full' classNames={null} />
          <div className='max-w-[134px] w-full'>
            <RadioGroup value={selectedTime} onValueChange={setSelectedTime} className='flex flex-col gap-1'>
              {times.map(time => (
                <div
                  key={time}
                  className={cn(
                    'h-[54px] max-w-[134px] w-full border flex gap-2 items-center px-[18px] py-[17px]',
                    selectedTime === time ? 'bg-black text-white border-black' : 'border-gray-300'
                  )}
                >
                  <div
                    className={cn(
                      'w-4 h-4 rounded-full flex items-center justify-center',
                      selectedTime === time ? 'bg-red-500' : 'border border-gray-400'
                    )}
                  >
                    {selectedTime === time && <div className='w-2 h-2 bg-red-500 rounded-full'></div>}
                  </div>
                  <div>{time}</div>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
        <p className='flex gap-[10px] items-center text-sm text-gray-500 mt-4 bg-secondary-white py-[11px] px-3 text-primary-black'>
          <MyxIcon name='info' className='w-5 h-5' />
          If you wish to cancel your appointment, please contact us at +1 (972)-349-9599
        </p>
        <DialogFooter className='flex gap-6 flex-row items-center w-full justify-center'>
          <Button onClick={handleUpdateAppointment}>Update appointment</Button>
          <Button variant='blackUnderline'>Do not update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ScheduleAppointment
