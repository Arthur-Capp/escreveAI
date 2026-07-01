import Header from "@/components/Header"
import Hero from "@/components/Hero"
import TextGenerator from "@/components/TextGenerator"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100">
      <Header />
      <main className="flex-1">
        <Hero />
        <TextGenerator />
      </main>
      <footer className="border-t border-zinc-800 py-6 text-center text-sm text-zinc-500">
        EscreveAI — Textos profissionais com IA
      </footer>
    </div>
  )
}
