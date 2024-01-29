import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import TrpcProvider from '@/trpc/provider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'kpop - guessr',
  description: 'kpop idol guessing game',
}

export default function RootLayout({ children }: { children: ReactNode })
{
  return (
    <html lang="en">
      <body className={cn(inter.className, 'w-screen min-h-dvh p-6', 'grid place-items-center', 'bg-newjeans bg-fixed')}>
        <TrpcProvider>
            {children}
        </TrpcProvider>
      </body>
    </html>
  )
}
