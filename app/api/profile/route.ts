import { AppError } from "@/lib/utils/errors";
import { fail, ok } from "@/lib/utils/http";
import { getCurrentUser } from "@/lib/auth/session";
import { updateUserProfile } from "@/lib/auth/user-service";
import {
  profileEmailSchema,
  profilePasswordSchema,
  profileUpdateSchema,
} from "@/lib/validations/profile";

let devBypassProfile = {
  id: "dev-user",
  email: "dev@example.com",
};

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new AppError(401, "UNAUTHORIZED", "Authentification requise.");
    }

    if (user.id === "dev-user") {
      return ok(devBypassProfile);
    }

    return ok({
      id: user.id,
      email: user.email ?? "",
    });
  } catch (error) {
    return fail(error);
  }
}

export async function PATCH(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new AppError(401, "UNAUTHORIZED", "Authentification requise.");
    }

    const body = await request.json();
    const parsedBody = profileUpdateSchema.safeParse(body);
    if (!parsedBody.success) {
      throw new AppError(400, "INVALID_INPUT", "Les informations saisies sont invalides.");
    }

    const wantsEmailUpdate = typeof body.email === "string";
    const wantsPasswordUpdate =
      typeof body.currentPassword === "string" ||
      typeof body.newPassword === "string" ||
      typeof body.confirmPassword === "string";

    let email: string | undefined;
    let currentPassword: string | undefined;
    let newPassword: string | undefined;

    if (wantsEmailUpdate) {
      const parsedEmail = profileEmailSchema.safeParse({ email: body.email });
      if (!parsedEmail.success) {
        throw new AppError(400, "INVALID_INPUT", "Email invalide.");
      }
      email = parsedEmail.data.email;
    }

    if (wantsPasswordUpdate) {
      const parsedPassword = profilePasswordSchema.safeParse({
        currentPassword: body.currentPassword,
        newPassword: body.newPassword,
        confirmPassword: body.confirmPassword,
      });
      if (!parsedPassword.success) {
        throw new AppError(400, "INVALID_INPUT", "Le mot de passe saisi est invalide.");
      }

      currentPassword = parsedPassword.data.currentPassword;
      newPassword = parsedPassword.data.newPassword;
    }

    if (user.id === "dev-user") {
      if (email) {
        devBypassProfile = { ...devBypassProfile, email };
      }

      return ok({
        id: devBypassProfile.id,
        email: devBypassProfile.email,
      });
    }

    const updated = await updateUserProfile(user.id, {
      email,
      currentPassword,
      newPassword,
    });

    return ok({
      id: updated.id,
      email: updated.email,
      updatedAt: updated.updatedAt,
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return fail(new AppError(400, "INVALID_JSON", "Le corps de la requete est invalide."));
    }

    return fail(error);
  }
}
