import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
<<<<<<< HEAD
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
=======
  title: 'Dream Trip Generator',
  description: 'Get a personalized travel itinerary',
  generator: 'Shirina Huang',
>>>>>>> 7cd9b48 (Initial commit with full project and Stripe webhook)
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
