# EscreveAI — AGENTS.md

Gerador de textos profissionais com IA (Groq / Llama 3.1). Sem auth, sem banco, tema escuro.

## Comandos

```bash
npm run dev      # dev server em http://localhost:3000
npm run build    # production build (roda antes de commitar)
npm run lint     # eslint
```

Não existe script de testes. Não existe typecheck separado — `npm run build` cobre TypeScript.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **Tailwind CSS 4** (CSS-first config, sem `tailwind.config.ts`)
- **Groq SDK** (`groq-sdk`) — API compatível com OpenAI, modelo `llama-3.1-8b-instant`
- **lucide-react** — ícones

## Arquitetura

```
app/
├── layout.tsx              # Root layout (dark theme, pt-BR, Geist font)
├── page.tsx                # Landing page (Header + Hero + TextGenerator)
├── globals.css             # Tailwind imports + tema escuro
└── api/generate/route.ts   # POST → Groq API (protege a key)

components/
├── TextGenerator.tsx       # Estado central (select, fields, result, history)
├── DynamicFields.tsx       # Inputs dinâmicos por tipo de texto
├── ResultCard.tsx          # Texto gerado + botão copiar
├── HistoryList.tsx         # Últimos 5 textos (memória, clicável)
├── Header.tsx              # Logo
└── Hero.tsx                # Seção hero da landing

lib/
├── types.ts                # TextType, HistoryEntry, field configs
└── prompts.ts              # buildPrompt(type, fields) → { system, user }
```

## Fluxo principal

1. Usuário seleciona tipo (email / linkedin / produto / bio)
2. `DynamicFields` renderiza inputs específicos do tipo
3. Botão "Gerar" faz `POST /api/generate` com `{ type, fields }`
4. API route monta prompt via `buildPrompt()`, chama Groq, retorna `{ text }`
5. `ResultCard` exibe texto + botão copiar
6. `HistoryList` mantém últimos 5 em `useState` (sem persistência)

## Env

`.env.local` — obrigatório:
```
GROQ_API_KEY=gsk_xxxxx
```
A key nunca é exposta ao client. Só é acessada em `app/api/generate/route.ts`.

## Convenções

- **Idioma**: prompts e UI em português. A IA adapta o idioma do texto gerado ao idioma do input.
- **Temas escuro**: classe `dark` fixa no `<html>`. Cores: zinc-950 (bg), violet-600 (accent).
- **Componentes**: todos `"use client"` exceto `page.tsx` (server component que importa client components).
- **Types**: definições em `lib/types.ts`, não em cada componente.
- **Prompts**: lógica de prompt em `lib/prompts.ts`, não na API route.

## Next.js 16 — atenção

Esta versão tem breaking changes em relação a versões anteriores. Se precisar de APIs do Next.js, consulte os docs em `node_modules/next/dist/docs/` antes de assumir comportamento.
