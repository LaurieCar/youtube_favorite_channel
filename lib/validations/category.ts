import { z } from "zod";

export const categoryKeywordSchema = z
  .string()
  .trim()
  .min(1, "Le mot-clé ne peut pas être vide.")
  .max(80, "Le mot-clé est trop long.");

export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Le nom doit contenir au moins 2 caractères.")
    .max(80, "Le nom de catégorie est trop long."),
  keywords: z
    .array(categoryKeywordSchema)
    .min(1, "Ajoutez au moins un mot-clé.")
    .max(20, "Une catégorie ne peut pas contenir plus de 20 mots-clés."),
});

export function normalizeCategoryValue(value: string) {
  return value.trim().toLocaleLowerCase("fr-FR");
}
