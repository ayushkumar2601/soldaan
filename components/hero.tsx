"use client"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function Hero() {
  return (
    <div className="mb-12 flex flex-col items-center space-y-6 text-center">
      <h1 className="font-serif text-6xl font-light tracking-tight text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] md:text-7xl lg:text-8xl">
        SolDaan.
      </h1>

      <p className="text-xs font-light uppercase tracking-[0.3em] text-white/80 md:text-sm">
        Premium Solana Faucet for Devnet
      </p>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-help rounded-full bg-red-500/90 px-4 py-1.5 text-xs font-medium text-white shadow-lg">
              Not Real Sol
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">Devnet funds only. No real monetary value.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
