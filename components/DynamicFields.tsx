"use client"

import { TextType } from "@/lib/types"

type DynamicFieldsProps = {
  type: TextType
  fields: Record<string, string>
  onChange: (fields: Record<string, string>) => void
}

const fieldConfig: Record<TextType, { key: string; label: string; placeholder: string; inputType?: "select"; options?: string[] }[]> = {
  email: [
    { key: "destinatario", label: "Destinatario", placeholder: "Ex: Diretor de Marketing" },
    { key: "assunto", label: "Assunto", placeholder: "Ex: Proposta de parceria" },
    { key: "tom", label: "Tom", placeholder: "", inputType: "select", options: ["Formal", "Cordial", "Direto", "Amigavel"] },
  ],
  linkedin: [
    { key: "tema", label: "Tema", placeholder: "Ex: Inteligencia Artificial no marketing" },
    { key: "objetivo", label: "Objetivo", placeholder: "Ex: Educar, inspirar, vender" },
    { key: "tom", label: "Tom", placeholder: "", inputType: "select", options: ["Inspirador", "Tecnico", "Casual", "Profissional"] },
  ],
  produto: [
    { key: "nome", label: "Nome do Produto", placeholder: "Ex: Fone Bluetooth ProMax" },
    { key: "publico", label: "Publico-alvo", placeholder: "Ex: Jovens profissionais 25-35 anos" },
    { key: "diferenciais", label: "Diferenciais", placeholder: "Ex: Bateria de 48h, cancelamento de ruido" },
  ],
  bio: [
    { key: "nome", label: "Nome", placeholder: "Ex: Maria Silva" },
    { key: "cargo", label: "Cargo", placeholder: "Ex: Gerente de Produto" },
    { key: "experiencia", label: "Experiencia", placeholder: "Ex: 8 anos em tech, ex-Amazon" },
    { key: "tom", label: "Tom", placeholder: "", inputType: "select", options: ["Profissional", "Criativo", "Conciso", "Descontraido"] },
  ],
}

export default function DynamicFields({ type, fields, onChange }: DynamicFieldsProps) {
  const config = fieldConfig[type]

  function updateField(key: string, value: string) {
    onChange({ ...fields, [key]: value })
  }

  return (
    <div className="grid gap-4">
      {config.map((field) => (
        <div key={field.key} className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-zinc-300">{field.label}</label>
          {field.inputType === "select" && field.options ? (
            <select
              value={fields[field.key] || ""}
              onChange={(e) => updateField(field.key, e.target.value)}
              className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-zinc-100 outline-none transition-colors focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
            >
              <option value="">Selecione...</option>
              {field.options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              value={fields[field.key] || ""}
              onChange={(e) => updateField(field.key, e.target.value)}
              placeholder={field.placeholder}
              className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-zinc-100 placeholder-zinc-500 outline-none transition-colors focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
            />
          )}
        </div>
      ))}
    </div>
  )
}
