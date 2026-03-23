import { z } from "zod";
import { passwordUpdateSchema } from "@/lib/validations/auth";

export const profileEmailSchema = z.object({
  email: z.string().trim().email("Veuillez saisir un email valide."),
});

export const profilePasswordSchema = passwordUpdateSchema;

export const profileUpdateSchema = z.object({
  email: z.string().trim().email().optional(),
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
  confirmPassword: z.string().optional(),
});
