"use client"

import { useState } from "react"
import { TextType, TEXT_TYPE_LABELS, HistoryEntry } from "@/lib/types"
import DynamicFields from "./DynamicFields"
import ResultCard from "./ResultCard"
import HistoryList from "./HistoryList"
import { Loader2, Wand2 } from "lucide-react"

const TYPE_OPTIONS: { value: TextType; label: string }[] = [
  { value: "email", label: "Email Profissional" },
  { value: "linkedin", label: "Post LinkedIn" },
  { value: "produto", label: "Descricao de Produto" },
  { value: "bio", label: "Bio Profissional" },
]

const TONE_OPTIONS = [
  { value: "formal", label: "Formal" },
  { value: "casual", label: "Casual" },
  { value: "divertido", label: "Divertido" },
  { value: "persuasivo", label: "Persuasivo" },
] as const

export type Tone = (typeof TONE_OPTIONS)[number]["value"]

export default function TextGenerator() {
  const [type, setType] = useState<TextType>("email")
  const [tone, setTone] = useState<Tone>("formal")
  const [fields, setFields] = useState<Record<string, string>>({})
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [history, setHistory] = useState<HistoryEntry[]>([])

  function handleTypeChange(newType: TextType) {
    setType(newType)
    setFields({})
    setResult("")
    setError("")
  }

  async function handleGenerate() {
    setLoading(true)
    setError("")
    setResult("")

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, fields, tone }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Erro ao gerar texto.")
        return
      }

      setResult(data.text)

      const entry: HistoryEntry = {
        id: crypto.randomUUID(),
        type,
        typeLabel: TEXT_TYPE_LABELS[type],
        tone,
        preview: data.text.slice(0, 80) + "...",
        fullText: data.text,
        timestamp: new Date(),
      }
      setHistory((prev) => [entry, ...prev].slice(0, 5))
    } catch {
      setError("Erro de conexao. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  function handleSelectHistory(entry: HistoryEntry) {
    setType(entry.type)
    setResult(entry.fullText)
    setError("")
  }

  const hasContent = Object.values(fields).some((v) => v.trim() !== "")

  return (
    <section id="generator" className="mx-auto w-full max-w-2xl px-6 py-16">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
        <h2 className="mb-6 text-xl font-semibold text-zinc-100">
          O que voce quer gerar?
        </h2>

        {/* Type selector */}
        <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {TYPE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleTypeChange(opt.value)}
              className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                type === opt.value
                  ? "bg-violet-600 text-white"
                  : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Tone selector */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-zinc-300">Tom do texto</label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {TONE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setTone(opt.value)}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  tone === opt.value
                    ? "bg-violet-600 text-white"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic fields */}
        <DynamicFields type={type} fields={fields} onChange={setFields} />

        {/* Generate button */}
        <button
          onClick={handleGenerate}
          disabled={loading || !hasContent}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-medium text-white transition-colors hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Gerando...
            </>
          ) : (
            <>
              <Wand2 size={18} />
              Gerar Texto
            </>
          )}
        </button>

        {/* Error */}
        {error && (
          <div className="mt-4 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="mt-6">
            <ResultCard text={result} />
          </div>
        )}
      </div>

      {/* History */}
      <div className="mt-6">
        <HistoryList history={history} onSelect={handleSelectHistory} />
      </div>
    </section>
  )
}
