import './globals.css'
import { GeistSans } from 'geist/font/sans'
import { Analytics } from '@vercel/analytics/next'
import ClientWrapper from './components/ClientWrapper'


export const metadata = {
  title: 'Personalized Learning',
  description: 'Created by Kshitij',
  generator: 'Kshitij',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable}`}>
        {/* Wrap client-only styling */}
        <ClientWrapper>{children}</ClientWrapper>

        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  )
}
