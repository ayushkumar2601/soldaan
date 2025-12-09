import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
})

export const metadata: Metadata = {
  title: "SolDaan - Premium Solana Faucet for Devnet",
  description: "Get free devnet SOL for testing on Solana. Premium faucet experience.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/",
        type: "image/svg+xml",
      },
    ],
    apple: "/",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
