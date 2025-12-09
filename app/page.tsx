"use client"

import { SolanaWalletProvider } from "@/components/solana-wallet-provider"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { FaucetForm } from "@/components/faucet-form"
import { Toaster } from "@/components/ui/toaster"

export default function Page() {
  return (
    <SolanaWalletProvider>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0a1e1e] via-[#0d2626] to-[#1a1420]">
        {/* Vignette effect */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
        {/* Center glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/10 blur-[120px]" />
        <Navbar />
        <main className="relative flex min-h-screen flex-col items-center justify-center px-4 pb-32">
          <Hero />
          <FaucetForm />
        </main>
        <div className="">
        <footer className="relative border-t border-white/10 py-6">
          <p className="text-center text-sm text-white/60">
            made in India with <span className="text-red-500">❤️</span>
          </p>
        </footer>
        </div>
        <Toaster />
      </div>
    </SolanaWalletProvider>
  )
}
