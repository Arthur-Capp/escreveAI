"use client"

import { ChevronDown } from "lucide-react"

export default function Hero() {
  function scrollToGenerator() {
    document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="flex flex-col items-center px-6 pt-24 pb-16 text-center">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-medium text-violet-300">
        Impulsionado por IA
      </div>
      <h1 className="mb-4 max-w-xl text-4xl font-bold leading-tight text-zinc-100 sm:text-5xl">
        Gere textos profissionais{" "}
        <span className="text-violet-400">em segundos</span>
      </h1>
      <p className="mb-10 max-w-md text-lg text-zinc-400">
        Emails, posts, descricoes e bios. Escolha o tipo, preencha o contexto e receba seu texto pronto.
      </p>
      <button
        onClick={scrollToGenerator}
        className="flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-medium text-white transition-colors hover:bg-violet-500"
      >
        Comecar a gerar
        <ChevronDown size={18} />
      </button>
    </section>
  )
}
