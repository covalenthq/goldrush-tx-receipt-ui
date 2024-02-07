"use client"

import { Analytics } from "@vercel/analytics/react"

import "@/styles/globals.css"
import "@covalenthq/goldrush-kit/styles.css"
import { Theme } from "@radix-ui/themes"

import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"

import "@radix-ui/themes/styles.css"
import { TXProvider } from "@/lib/store"
import { Toaster } from "@/components/ui/toaster"
import { Footer } from "@/components/footer"
import { KeyDialog } from "@/components/key-dialog"

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <Theme>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <TXProvider>
                <div className="relative flex min-h-screen flex-col">
                  <SiteHeader />
                  <div className="flex-1">{children}</div>
                  <Analytics />
                  <Footer />
                  <KeyDialog />
                  <Toaster />
                </div>
              </TXProvider>
            </ThemeProvider>
          </Theme>
        </body>
      </html>
    </>
  )
}
