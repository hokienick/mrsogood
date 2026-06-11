import { Archivo, Space_Grotesk } from 'next/font/google'
import { MotionConfig } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import LenisProvider from '../components/LenisProvider'
import './globals.css'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-archivo',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata = {
  title: 'Mr. So Good · Web Design for Small Business',
  description: 'Free website mockup in 24 hours. Nick redesigns and builds websites for small businesses: fast, affordable, no agency markup.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${archivo.variable} ${spaceGrotesk.variable}`}>
      <body>
        <MotionConfig reducedMotion="user">
          <LenisProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </LenisProvider>
        </MotionConfig>
      </body>
    </html>
  )
}
