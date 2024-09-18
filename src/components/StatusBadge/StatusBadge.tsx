import { cn } from '@/lib/utils'
import { Status } from '@/types/types'
import React from 'react'


interface StatusBadgeProps {
  status: Status
}

const statusStyles: Record<Status, string> = {
  completed: 'bg-system-submit',
  paid: 'bg-secondary-blue',
  processing: 'bg-secondary-yellow',
  failed: 'bg-secondary-red',
  cancelled: 'bg-secondary-red',
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <div
      className={cn(
        'flex w-max justify-center items-center px-2 py-1 rounded-[36px] text-xs font-semibold capitalize',
        statusStyles[status]
      )}
    >
      {status}
    </div>
  )
}

export default StatusBadge
