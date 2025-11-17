import { z } from 'zod';

// Regex para validações
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nomeRegex = /^[a-zA-ZÀ-ÿ\s']{2,50}$/;
const telefoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;

export const usuarioSchema = z.object({
  nome: z.string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(50, "Nome muito longo")
    .regex(nomeRegex, "Nome deve conter apenas letras e espaços"),
  
  email: z.string()
    .email("Email inválido")
    .regex(emailRegex, "Formato de email incorreto"),
  
  telefone: z.string()
    .regex(telefoneRegex, "Telefone no formato (99) 99999-9999")
    .optional()
    .or(z.literal('')),
  
  setor: z.string()
    .min(1, "Selecione um setor"),
  
  cargo: z.string()
    .min(2, "Cargo deve ter pelo menos 2 caracteres")
    .max(30, "Cargo muito longo")
});

export const tarefaSchema = z.object({
  titulo: z.string()
    .min(3, "Título deve ter pelo menos 3 caracteres")
    .max(100, "Título muito longo"),
  
  descricao: z.string()
    .min(5, "Descrição deve ter pelo menos 5 caracteres")
    .max(500, "Descrição muito longa"),
  
  setor: z.string().min(1, "Selecione um setor"),
  
  usuarioId: z.string().min(1, "Selecione um usuário responsável"),
  
  prioridade: z.enum(['baixa', 'media', 'alta'], {
    errorMap: () => ({ message: "Selecione uma prioridade válida" })
  }),
  
  dataVencimento: z.string()
    .min(1, "Data de vencimento é obrigatória")
    .refine(date => new Date(date) > new Date(), {
      message: "Data deve ser futura"
    })
});