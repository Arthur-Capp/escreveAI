import { NextResponse } from "next/server"
import Groq from "groq-sdk"
import { buildPrompt } from "@/lib/prompts"
import { TextType } from "@/lib/types"
import { checkRateLimit } from "@/lib/rate-limit"

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for")
  if (forwarded) {
    return forwarded.split(",")[0].trim()
  }
  return "127.0.0.1"
}

function verifyApiKey(req: Request): boolean {
  const apiKey = process.env.API_KEY
  if (!apiKey) return true

  const provided = req.headers.get("x-api-key")
  return provided === apiKey
}

function verifyOrigin(req: Request): boolean {
  const origin = req.headers.get("origin")
  const host = req.headers.get("host")

  if (!origin || !host) return true

  try {
    const originHost = new URL(origin).host
    return originHost === host
  } catch {
    return false
  }
}

export async function POST(req: Request) {
  try {
    if (!verifyOrigin(req)) {
      return NextResponse.json({ error: "Requisicao invalida." }, { status: 403 })
    }

    if (!verifyApiKey(req)) {
      return NextResponse.json({ error: "Acesso nao autorizado." }, { status: 401 })
    }

    const ip = getClientIp(req)
    const { allowed, remaining, resetIn } = checkRateLimit(ip)

    if (!allowed) {
      return NextResponse.json(
        { error: "Limite de requisicoes atingido. Tente novamente em breve." },
        { status: 429, headers: { "Retry-After": String(Math.ceil(resetIn / 1000)) } }
      )
    }

    const { type, fields, tone } = await req.json()

    if (!type || !fields) {
      return NextResponse.json({ error: "Tipo e campos sao obrigatorios." }, { status: 400 })
    }

    const validTypes: TextType[] = ["email", "linkedin", "produto", "bio"]
    if (!validTypes.includes(type)) {
      return NextResponse.json({ error: "Tipo invalido." }, { status: 400 })
    }

    const { system, user } = buildPrompt(type, fields, tone)

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      temperature: 0.7,
      max_tokens: 1024,
    })

    const text = completion.choices[0]?.message?.content

    if (!text) {
      return NextResponse.json({ error: "Nenhum texto foi gerado." }, { status: 500 })
    }

    return NextResponse.json(
      { text },
      {
        headers: {
          "X-RateLimit-Remaining": String(remaining),
          "X-RateLimit-Reset": String(Math.ceil((Date.now() + resetIn) / 1000)),
        },
      }
    )
  } catch (error) {
    console.error("Erro na API:", error instanceof Error ? error.message : "Unknown error")
    return NextResponse.json({ error: "Erro ao gerar texto. Tente novamente." }, { status: 500 })
  }
}
