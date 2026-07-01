"use client"

import { HistoryEntry } from "@/lib/types"
import { Clock } from "lucide-react"

type HistoryListProps = {
  history: HistoryEntry[]
  onSelect: (entry: HistoryEntry) => void
}

export default function HistoryList({ history, onSelect }: HistoryListProps) {
  if (history.length === 0) return null

  return (
    <div className="rounded-xl border border-zinc-700/50 bg-zinc-800/30 p-4">
      <div className="mb-3 flex items-center gap-2 text-sm text-zinc-400">
        <Clock size={14} />
        Historico
      </div>
      <div className="flex flex-col gap-2">
        {history.map((entry) => (
          <button
            key={entry.id}
            onClick={() => onSelect(entry)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-zinc-700/50"
          >
            <span className="shrink-0 rounded-md bg-violet-600/20 px-2 py-0.5 text-xs font-medium text-violet-300">
              {entry.typeLabel}
            </span>
            <span className="truncate text-sm text-zinc-300">{entry.preview}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
