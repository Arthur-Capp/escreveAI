import { TextType } from "./types"

const SYSTEM_BASE =
  "Voce e um escritor profissional brasileiro. Gere textos na mesma lingua usada no input do usuario. Seja direto, util e bem estruturado. Nao inclua explicacoes, apenas o texto solicitado."

const TONE_INSTRUCTIONS: Record<string, string> = {
  formal: "Use um tom formal, cortes e profissional. Evite gírias e abreviacoes.",
  casual: "Use um tom casual, amigavel e proximo. Pode usar linguagem mais coloquial.",
  divertido: "Use um tom divertido, com humor leve e criatividade. Pode incluir expressoes descontraidas.",
  persuasivo: "Use um tom persuasivo e envolvente. Destaque beneficios e crie urgencia.",
}

const prompts: Record<TextType, (fields: Record<string, string>) => string> = {
  email: (f) =>
    `Escreva um email profissional.\nDestinatario: ${f.destinatario}\nAssunto: ${f.assunto}\n\nEscreva o email completo com saudacao, corpo e despedida.`,

  linkedin: (f) =>
    `Escreva um post para LinkedIn.\nTema: ${f.tema}\nObjetivo: ${f.objetivo}\n\nEscreva um post com gancho, desenvolvimento e chamada para acao. Use paragrafos curtos e emojis com moderacao.`,

  produto: (f) =>
    `Escreva uma descricao de produto.\nNome: ${f.nome}\nPublico-alvo: ${f.publico}\nDiferenciais: ${f.diferenciais}\n\nEscreva uma descricao persuasiva e clara, ideal para e-commerce ou landing page.`,

  bio: (f) =>
    `Escreva uma bio profissional.\nNome: ${f.nome}\nCargo: ${f.cargo}\nExperiencia: ${f.experiencia}\n\nEscreva uma bio concisa e impactante, ideal para LinkedIn, Instagram ou portfolio.`,
}

export function buildPrompt(type: TextType, fields: Record<string, string>, tone?: string) {
  const toneInstruction = tone && TONE_INSTRUCTIONS[tone] ? `\n${TONE_INSTRUCTIONS[tone]}` : ""

  return {
    system: SYSTEM_BASE + toneInstruction,
    user: prompts[type](fields),
  }
}
