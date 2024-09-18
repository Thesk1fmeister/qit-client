import clsx from 'clsx'
import React from 'react'

type TStatusLabel = {
  status: string
}
const StatusLabel = ({ status }: TStatusLabel) => {
  return (
    <div
      className={clsx('w-max px-1.5 py-1 rounded-lg font-semibold text-xs', {
        'bg-system-submit text-secondary-darkGreen': status === 'Upcoming',
        'text-gray-400 bg-gray-400 bg-opacity-10': status === 'Past',
      })}
    >
      {status === 'Past' ? 'Past' : 'Upcoming'}
    </div>
  )
}

export default StatusLabel
