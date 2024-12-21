import { FC, ReactNode } from 'react'
import Link from 'next/link'

interface LayoutProps {
  children: ReactNode
}

const RootLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-green-500 font-mono">
        <header className="border-b border-green-500 p-4">
          <nav>
            <Link href="/" className="text-2xl font-bold hover:text-green-400 transition-colors">
              HackBlog
            </Link>
          </nav>
        </header>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="border-t border-green-500 p-4 text-center">
          <p>&copy; {new Date().getFullYear()} HackBlog. All rights reserved.</p>
        </footer>
      </body>
    </html>
  )
}

export default RootLayout

