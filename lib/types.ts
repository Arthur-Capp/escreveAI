export type TextType = "email" | "linkedin" | "produto" | "bio"

export type EmailFields = {
  destinatario: string
  assunto: string
  tom: string
}

export type LinkedInFields = {
  tema: string
  objetivo: string
  tom: string
}

export type ProdutoFields = {
  nome: string
  publico: string
  diferenciais: string
}

export type BioFields = {
  nome: string
  cargo: string
  experiencia: string
  tom: string
}

export type PromptFields = {
  email: EmailFields
  linkedin: LinkedInFields
  produto: ProdutoFields
  bio: BioFields
}

export type HistoryEntry = {
  id: string
  type: TextType
  typeLabel: string
  tone: string
  preview: string
  fullText: string
  timestamp: Date
}

export const TEXT_TYPE_LABELS: Record<TextType, string> = {
  email: "Email Profissional",
  linkedin: "Post LinkedIn",
  produto: "Descricao de Produto",
  bio: "Bio Profissional",
}
