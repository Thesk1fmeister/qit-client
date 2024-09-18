import { Button } from '@/components/ui/Button/Button'
import Link from 'next/link'

export default function Custom404() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-white text-center gap-6 sm:p-4'>
      <h1 className='text-4xl font-bold sm:text-base'>Oops..this page is not found</h1>
      <p className='text-lg text-secondary-dark sm:text-sm'>
        The page you are looking for doesn&apos;t exist or other error appeared.
      </p>
      <div className='text-[200px] font-extrabold text-gray-150 sm:text-[90px]'>404</div>
      <Link href='/'>
        <Button className='py-[8.5px] px-[18px] sm:py-1.5 sm:px-3 sm:text-sm'>Go back</Button>
      </Link>
    </div>
  )
}
