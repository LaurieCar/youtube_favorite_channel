import { AppError } from "@/lib/utils/errors";
import { created, fail } from "@/lib/utils/http";
import { createUser } from "@/lib/auth/user-service";
import { registerSchema } from "@/lib/validations/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      throw new AppError(400, "INVALID_INPUT", "Les informations saisies sont invalides.");
    }

    const user = await createUser(parsed.data.email, parsed.data.password);
    return created({ id: user.id, email: user.email });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return fail(new AppError(400, "INVALID_JSON", "Le corps de la requête est invalide."));
    }

    return fail(error);
  }
}
