"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const { publicKey, disconnect } = useWallet()
  const { setVisible } = useWalletModal()

  const handleWalletAction = () => {
    if (publicKey) {
      disconnect()
    } else {
      setVisible(true)
    }
  }

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  return (
    <nav className="relative z-10 flex items-center justify-end p-6 md:p-8">
      <Button
        onClick={handleWalletAction}
        className="rounded-full bg-teal-700/50 px-6 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-teal-700/70 hover:shadow-[0_0_20px_rgba(20,184,166,0.3)]"
      >
        {publicKey ? shortenAddress(publicKey.toBase58()) : "Connect Wallet"}
      </Button>
    </nav>
  )
}
