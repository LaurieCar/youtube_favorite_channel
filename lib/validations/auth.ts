import { z } from "zod";

const passwordRule = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

export const signInSchema = z.object({
  email: z.string().trim().email("Veuillez saisir un email valide."),
  password: z.string().min(1, "Veuillez saisir votre mot de passe."),
});

export const registerSchema = z.object({
  email: z.string().trim().email("Veuillez saisir un email valide."),
  password: z
    .string()
    .regex(
      passwordRule,
      "Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre.",
    ),
  confirmPassword: z.string(),
}).refine((values) => values.password === values.confirmPassword, {
  message: "Les mots de passe ne correspondent pas.",
  path: ["confirmPassword"],
});

export const passwordUpdateSchema = z.object({
  currentPassword: z.string().min(1, "Mot de passe actuel requis."),
  newPassword: z
    .string()
    .regex(
      passwordRule,
      "Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre.",
    ),
  confirmPassword: z.string(),
}).refine((values) => values.newPassword === values.confirmPassword, {
  message: "Les mots de passe ne correspondent pas.",
  path: ["confirmPassword"],
});

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}
