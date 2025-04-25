/* eslint-disable @next/next/no-sync-scripts */
'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AppSidebar } from '@/components/layout/Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import Header from '@/components/layout/Header';
import { TooltipProvider } from '@/components/ui/tooltip';
import { NavigationProvider } from '@/context/navigation.context';
import { InitializeWrapper } from './wrapper';
import { ContextProvider } from '@/context/contextProvider';
import { StoreProvider } from '@/app/storeProvider';

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
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <script
          crossOrigin="anonymous"
          src="//unpkg.com/react-scan/dist/auto.global.js"
        />
        {/* rest of your scripts go under */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full`}
      >
        <StoreProvider>
          <ContextProvider>
            <SidebarProvider>
              <NavigationProvider>
                <TooltipProvider>
                  <InitializeWrapper>
                    <AppSidebar />
                    <main className="w-full relative pb-4">
                      <Header />
                      <div className="content w-full px-4 pt-0 space-y-4">
                        {children}
                      </div>
                    </main>
                  </InitializeWrapper>
                </TooltipProvider>
              </NavigationProvider>
            </SidebarProvider>
          </ContextProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
