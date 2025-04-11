'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AppSidebar } from '@/components/layout/Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import Header from '@/components/layout/Header';
import { PatientsProvider } from './context/patients.context';
import { Suspense } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // className="dark"
    >
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full`}
      >
        <PatientsProvider>
          <SidebarProvider>
            <Suspense fallback="Loading...">
              <AppSidebar />
              <main className="w-full relative px-4 pb-4 overflow-x-hidden">
                <Header />
                <div className="content w-full pt-16">{children}</div>
              </main>
            </Suspense>
          </SidebarProvider>
        </PatientsProvider>
      </body>
    </html>
  );
}
