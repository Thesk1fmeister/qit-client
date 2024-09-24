'use client'
import { MyxIcon } from '@/components/icons'
import PageHeader from '@/components/PageHeader/PageHeader'
import ScheduleAppointment from '@/components/ScheduleAppointment/ScheduleAppointment'
import { Button } from '@/components/ui/Button/Button'
import React, { useState } from 'react'

const AppointmentPage = () => {
  const [status, setStatus] = useState<'Upcoming' | 'Past'>('Upcoming')
  const appointments = []
  // const upcomingList = appointments.filter((appointment: any) => {
  //   const appointmentDateTime = new Date(parseISO(appointment.date))
  //   const [hours, minutes] = appointment.time.split(':')
  //   appointmentDateTime.setHours(Number(hours), Number(minutes))

  //   return isAfter(appointmentDateTime, new Date())
  // })

  // const pastList = appointments.filter((appointment: any) => {
  //   const appointmentDateTime = new Date(parseISO(appointment.date))
  //   const [hours, minutes] = appointment.time.split(':')
  //   appointmentDateTime.setHours(Number(hours), Number(minutes))

  //   return isBefore(appointmentDateTime, new Date())
  // })
  const pastList = null
  const upcomingList = null
  const listToDisplay = status === 'Upcoming' ? upcomingList : pastList
  return (
    <div className='flex w-full h-full flex-col gap-8 text-primary-black'>
      <PageHeader title='My Appointments' />
      {appointments.length ? (
        <div className='flex flex-col gap-5'>
          <div className='w-max flex rounded-lg overflow-hidden border border-gray-300'>
            <Button
              className={`!h-max !py-[7px] text-base font-semibold flex items-center justify-center ${
                status === 'Upcoming' ? 'bg-black text-white' : 'bg-white text-gray-600'
              }`}
              onClick={() => setStatus('Upcoming')}
            >
              Upcoming
            </Button>
            <Button
              className={`!h-max !py-[7px] text-base font-semibold flex items-center justify-center ${
                status === 'Past' ? 'bg-black text-white' : 'bg-white text-gray-600'
              }`}
              onClick={() => setStatus('Past')}
            >
              Past
            </Button>
          </div>
          <div className='flex flex-col border border-secondary-black-blue'>
            <div className='flex justify-between p-5'>
              <div className='flex flex-col gap-6 items-start'>
                <div className='flex gap-8 items-center justify-center'>
                  <div className='flex gap-2 max-w-[88px] w-full items-center'>
                    <MyxIcon name='pin' className='size-5' />
                    <span className='text-base'>WHERE</span>
                  </div>
                  <div className='flex flex-col gap-2 font-semibold'>
                    <span>Dallas office, 3517 W. Gray St. Utica, Pennsylvania 57867</span>
                  </div>
                </div>
                <div className='flex gap-8 items-center justify-center'>
                  <div className='flex gap-2 max-w-[88px] w-full items-center'>
                    <MyxIcon name='clock' className='size-5' />
                    <span className='text-base'>WHEN</span>
                  </div>
                  <div className='flex flex-col gap-2 font-semibold'>
                    <span>Friday, 01/02/2023</span>
                    <span>09:00-11.00</span>
                  </div>
                </div>
                <div className='flex gap-8 items-center justify-center'>
                  <div className='flex gap-2 max-w-[88px] w-full items-center'>
                    <MyxIcon name='event' className='size-5' />
                    <span className='text-base'>WHAT</span>
                  </div>
                  <div className='flex flex-col gap-2 font-semibold'>
                    <span>MIX IT UP Service</span>
                    <span>6 person</span>
                  </div>
                </div>
              </div>
              {status === 'Upcoming' && (
                <div className='flex gap-6'>
                  <ScheduleAppointment trigger={<MyxIcon name='edit' className='size-5' />} />
                  <MyxIcon name='delete' className='size-5' />
                </div>
              )}
            </div>
            {status === 'Upcoming' && (
              <div className='flex px-5 py-[11px] border-t border-secondary-light-grey justify-end'>
                <Button>Add to Google Calendar</Button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className='flex mt-20 flex-col gap-10 items-center justify-center'>
          <div className='flex flex-col gap-4 items-center'>
            <div className='text-lg font-semibold'>No reservations yet? Let’s change that!</div>
            <div>Book your first service today and receive your unique lipstick</div>
          </div>
          <div>
            <Button>Go to reserve your spot</Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AppointmentPage
