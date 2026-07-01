"use client"

import { Sparkles } from "lucide-react"

export default function Header() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-3xl items-center gap-2 px-6 py-4">
        <Sparkles size={22} className="text-violet-400" />
        <span className="text-lg font-bold text-zinc-100">EscreveAI</span>
      </div>
    </header>
  )
}
