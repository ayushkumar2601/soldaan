"use client"

import { ReactNode, useMemo } from "react"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"

import "@solana/wallet-adapter-react-ui/styles.css"

// ✅ Your devnet RPC (Alchemy, still Devnet)
const RPC_ENDPOINT =
  "https://solana-devnet.g.alchemy.com/v2/jEQmlgdWPIOypiR9RR6vK"

type SolanaWalletProviderProps = {
  children: ReactNode
}

export function SolanaWalletProvider({ children }: SolanaWalletProviderProps) {
  const network = WalletAdapterNetwork.Devnet

  const wallets = useMemo(() => {
    // 1️⃣ Start with the wallets you actually want to support
    const baseWallets = [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      // ⚠️ DO NOT add MetaMask or EVM wallets here for now
    ]

    // 2️⃣ Deduplicate by wallet.name to avoid "MetaMask MetaMask" etc.
    const seen = new Set<string>()
    const unique = baseWallets.filter((wallet) => {
      if (!wallet || typeof wallet.name !== "string") return false
      if (seen.has(wallet.name)) return false
      seen.add(wallet.name)
      return true
    })

    // Optional: if you want to see what wallets are actually there:
    // console.log("Solana wallets:", unique.map((w) => w.name))

    return unique
  }, [network])

  return (
    <ConnectionProvider endpoint={RPC_ENDPOINT}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
