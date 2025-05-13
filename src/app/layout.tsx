import { SITE_CONFIG } from "@/config"
import { cn } from "@/lib/utils"
import "@/styles/globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { Inter } from "next/font/google"
import { DashboardStateProvider } from "./dashboard/DashboardStateContext"
import ThemeProvider from "@/components/providers/theme-provider"
import { ThemeToggle } from "@/components/ThemeToggle"

const font = Inter({ subsets: ["latin"] })

export const metadata = SITE_CONFIG // make sure SITE_CONFIG is a valid Metadata object

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background text-foreground antialiased max-w-full overflow-x-hidden",
          font.className
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ClerkProvider appearance={{ baseTheme: dark }}>
            <DashboardStateProvider>
              {children}
              <div className="fixed bottom-4 right-4 z-50">
                <ThemeToggle />
              </div>
            </DashboardStateProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
