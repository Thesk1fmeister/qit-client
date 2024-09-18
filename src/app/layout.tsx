import React from 'react'
import '../styles/globals.css'
import { Open_Sans, Libre_Franklin } from 'next/font/google'

const libre_franklin = Libre_Franklin({ subsets: ['latin'], weight: ['400', '600', '200', '500'] })

const NotFoundLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body className={libre_franklin.className}>{children}</body>
    </html>
  )
}

export default NotFoundLayout
