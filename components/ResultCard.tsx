"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

type ResultCardProps = {
  text: string
}

export default function ResultCard({ text }: ResultCardProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-xl border border-zinc-700 bg-zinc-800/50 p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-medium text-zinc-400">Texto Gerado</h3>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-violet-500"
        >
          {copied ? (
            <>
              <Check size={14} />
              Copiado!
            </>
          ) : (
            <>
              <Copy size={14} />
              Copiar
            </>
          )}
        </button>
      </div>
      <div className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-200">
        {text}
      </div>
    </div>
  )
}
