import './globals.css'
import { Inter } from 'next/font/google'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Med Help',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <Providers>
        <body className={inter.className}>
          <main className='w-[100vw] max-w-[512px] h-[100vh] flex items-center justify-center'
            style={{ background: 'url(https://img.freepik.com/free-vector/white-abstract-background_23-2148810113.jpg?w=1480&t=st=1688719760~exp=1688720360~hmac=268355cb6d1e222f73bb411ce272fea5e4daf5a833f3d9453c12b8712e472218)' }}
          >
            <div className='w-[95%] flex flex-col items-center justify-start h-[95%]'>
              {children}
            </div>
          </main>
        </body>
      </Providers>
    </html>
  )
}
