import { Providers } from '@/redux/provider'
import { Libre_Franklin } from 'next/font/google'

import '../../styles/globals.css'

const libre_franklin = Libre_Franklin({ subsets: ['latin'], weight: ['400', '600', '200', '500'] })

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Providers>
      <html lang='en'>
        <body className={libre_franklin.className}>{children}</body>
      </html>
    </Providers>
  )
}
