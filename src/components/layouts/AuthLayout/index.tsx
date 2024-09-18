import React, { ReactNode } from 'react'

type TAuthLayoutProps = {
  children: ReactNode
  title: string
  subtitle?: string
  bgImage: string
}
const AuthLayout = ({ children, title, subtitle, bgImage }: TAuthLayoutProps) => {
  return (
    <>
      <div className='relative h-screen lg:flex lg:items-center lg:flex-row md:flex md:flex-col-reverse sm:flex-col'>
        <div
          className='relative lg:h-full w-full flex-col justify-end bg-cover bg-center md:h-full md:flex sm:max-h-[326px] sm:h-full'
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div>

        <div className='w-full p-8 lg:p-8 sm:p-4 overflow-y-auto' style={{ maxHeight: '100vh' }}>
          <div className='mx-auto flex lg:w-[405px] flex-col justify-center space-y-6 md:max-w-[605px] sm:max-w-[358px]'>
            <div className='flex flex-col gap-2 mt-20'>
              <h1 className='text-3xl font-semibold tracking-tight'>{title}</h1>
              <p className='text-base'>{subtitle}</p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default AuthLayout
