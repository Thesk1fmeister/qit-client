import React from 'react'

type TPageHeaderProps = {
  title: string
  children?: React.ReactNode
}
const PageHeader = ({ title, children }: TPageHeaderProps) => {
  return (
    <div className='flex flex-col gap-4 w-full'>
      <h1 className='text-[1.75rem] font-semibold'>{title}</h1>
      <div className='w-full border-b-2 border-gray-700'></div>
    </div>
  )
}

export default PageHeader
