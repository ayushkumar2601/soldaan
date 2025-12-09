"use client"

import { useState, useEffect } from "react"
import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function FaucetForm() {
  const { publicKey } = useWallet()
  const { connection } = useConnection()
  const { toast } = useToast()

  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [cooldownEnd, setCooldownEnd] = useState<number | null>(null)
  const [cooldownSeconds, setCooldownSeconds] = useState(0)

  useEffect(() => {
    if (!cooldownEnd) return

    const interval = setInterval(() => {
      const remaining = Math.ceil((cooldownEnd - Date.now()) / 1000)
      if (remaining <= 0) {
        setCooldownEnd(null)
        setCooldownSeconds(0)
      } else {
        setCooldownSeconds(remaining)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [cooldownEnd])

  const validateAmount = (value: string): string | null => {
    if (!value || value.trim() === "") {
      return "Please enter an amount"
    }

    const num = Number.parseFloat(value)
    if (isNaN(num)) {
      return "Please enter a valid number"
    }

    if (num <= 0) {
      return "Amount must be greater than 0"
    }

    if (num > 2) {
      return "Please enter a valid amount between 0.1 and 2 SOL."
    }

    return null
  }

  const handleDrop = async () => {
    setError("")

    if (!publicKey) {
      setError("Connect your wallet first.")
      return
    }

    if (cooldownEnd && Date.now() < cooldownEnd) {
      return
    }

    const validationError = validateAmount(amount)
    if (validationError) {
      setError(validationError)
      return
    }

    setIsLoading(true)

    try {
      const lamports = Number.parseFloat(amount) * LAMPORTS_PER_SOL

      const signature = await connection.requestAirdrop(publicKey, lamports)

      await connection.confirmTransaction(signature, "confirmed")

      // Set cooldown
      setCooldownEnd(Date.now() + 60000)

      toast({
        title: "SOL dropped successfully",
        description: (
          <div className="mt-2 space-y-2">
            <p>{amount} SOL sent to your devnet wallet.</p>
            <a
              href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300"
            >
              View transaction <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        ),
        duration: 5000,
      })

      setAmount("")
    } catch (err: any) {
      console.error("[v0] Airdrop error:", err)

      let errorMessage = "Something went wrong while requesting SOL. Please try again."

      if (err.message?.includes("429") || err.message?.includes("airdrop")) {
        errorMessage = "Devnet is currently busy. Please try again in a moment."
      }

      toast({
        title: "Airdrop failed",
        description: errorMessage,
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const isDisabled = isLoading || (cooldownEnd !== null && Date.now() < cooldownEnd)

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="relative">
        <Input
          type="text"
          placeholder="enter the amount"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value)
            setError("")
          }}
          className="h-14 rounded-2xl border-white/20 bg-black/30 pr-16 text-white placeholder:text-white/40 backdrop-blur-sm transition-all focus:border-teal-400/50 focus:shadow-[0_0_20px_rgba(20,184,166,0.2)] focus:ring-0 focus:ring-offset-0"
        />
        <Button
          onClick={handleDrop}
          disabled={isDisabled}
          className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-transparent transition-all duration-300 hover:border-teal-400/60 hover:bg-teal-400/10 hover:shadow-[0_0_15px_rgba(20,184,166,0.3)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/20 disabled:hover:bg-transparent disabled:hover:shadow-none group"
          aria-label="Drop SOL"
        >
          <ArrowUpRight className="h-5 w-5 text-white/80 transition-transform duration-300 group-hover:rotate-45 group-hover:text-teal-300" />
        </Button>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <Button
        onClick={handleDrop}
        disabled={isDisabled}
        className="w-full h-12 rounded-2xl bg-teal-600/80 text-white font-medium hover:bg-teal-600 transition-all duration-300 hover:shadow-[0_0_20px_rgba(20,184,166,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-teal-600/80 disabled:hover:shadow-none"
      >
        {isLoading ? "Dropping..." : cooldownSeconds > 0 ? `Wait ${cooldownSeconds}s` : "Drop SOL"}
      </Button>

      <p className="text-center text-xs text-white/50">Devnet only • Max 2 SOL per request • 60s cooldown</p>

      {cooldownSeconds > 0 && (
        <p className="text-center text-sm text-white/60">You can request again in {cooldownSeconds}s.</p>
      )}
    </div>
  )
}
