import React from 'react'
import localFont from 'next/font/local'
import { Dancing_Script, Playfair_Display } from 'next/font/google'
import './globals.css'
import { clsx } from 'clsx'

const centur = localFont({
  src: [
    {
      path: '../../../public/fonts/Centur.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-centur',
  display: 'swap',
  fallback: ['sans-serif'],
})

const qalisha = localFont({
  src: [
    {
      path: '../../../public/fonts/QalishaSignatureScript.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-qalisha',
  display: 'swap',
  fallback: ['serif'],
})

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing-script',
  display: 'swap',
  fallback: ['cursive'],
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
  fallback: ['serif'],
})

export const metadata = {
  description: 'Wedding Invitation',
  title: 'Wedding Invitation',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html
      lang="en"
      className={clsx(
        centur.variable,
        qalisha.variable,
        dancingScript.variable,
        playfairDisplay.variable,
      )}
    >
      <body className="font-sans antialiased">
        <main>{children}</main>
      </body>
    </html>
  )
}
