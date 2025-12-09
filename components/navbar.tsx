"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const { publicKey, disconnect } = useWallet()
  const { setVisible } = useWalletModal()

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  return (
    <nav className="relative z-10 flex items-center justify-end gap-3 p-6 md:p-8">
      {!publicKey ? (
        // --- Connect Wallet Button (only visible if NOT connected) ---
        <Button
          onClick={() => setVisible(true)}
          className="rounded-full bg-teal-700/50 px-6 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-teal-700/70 hover:shadow-[0_0_20px_rgba(20,184,166,0.3)]"
        >
          Connect Wallet
        </Button>
      ) : (
        <>
          {/* --- Show connected address (read-only) --- */}
          <Button
            disabled
            className="rounded-full bg-black/40 border border-white/20 px-6 py-2 text-sm font-medium text-teal-300 cursor-default"
          >
            {shortenAddress(publicKey.toBase58())}
          </Button>

          {/* --- Disconnect button --- */}
          <Button
            onClick={disconnect}
            className="rounded-full bg-red-500/50 px-6 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-red-500/70 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
          >
            Disconnect
          </Button>
        </>
      )}
    </nav>
  )
}
