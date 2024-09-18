'use client'
import { Libre_Franklin, Open_Sans } from 'next/font/google'
import '../../styles/globals.css'
import { Providers } from '@/redux/provider'
import { useEffect } from 'react'
import { getFromStorage } from '@/utils/storage'
import { usePathname, useRouter } from 'next/navigation'
import { Toaster } from 'react-hot-toast'
import { storageKeys } from '@/constants/storage'
import ProfileLayout from '@/components/layouts/ProfileLayout'

const libre_franklin = Libre_Franklin({ subsets: ['latin'], weight: ['400', '600', '200', '500'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const pathname = usePathname()
  const token = getFromStorage(storageKeys.AUTH)

  useEffect(() => {
    if (!token) {
      router.push('/auth')
    }
  }, [pathname])
  return (
    <>
      <Providers>
        <html lang='en'>
          <body className={libre_franklin.className}>
            <Toaster position='top-right' />
            <ProfileLayout>{children}</ProfileLayout>
          </body>
        </html>
      </Providers>
    </>
  )
}
