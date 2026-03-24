import { compare, hash } from "bcryptjs";
import { prisma } from "@/lib/db/prisma";
import { AppError } from "@/lib/utils/errors";
import { normalizeEmail } from "@/lib/validations/auth";

const SALT_ROUNDS = 12;

export async function hashPassword(password: string) {
  return hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, passwordHash: string) {
  return compare(password, passwordHash);
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email: normalizeEmail(email) },
  });
}

export async function createUser(email: string, password: string) {
  const normalizedEmail = normalizeEmail(email);
  const existingUser = await findUserByEmail(normalizedEmail);

  if (existingUser) {
    throw new AppError(409, "EMAIL_ALREADY_USED", "Cet email est déjà utilisé.");
  }

  const passwordHash = await hashPassword(password);

  return prisma.user.create({
    data: {
      email: normalizedEmail,
      passwordHash,
    },
  });
}

export async function verifyCredentials(email: string, password: string) {
  const user = await findUserByEmail(email);

  if (!user) {
    return null;
  }

  const isValid = await verifyPassword(password, user.passwordHash);
  if (!isValid) {
    return null;
  }

  return user;
}

export async function findUserById(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      passwordHash: true,
      updatedAt: true,
    },
  });
}

type UpdateProfileInput = {
  email?: string;
  currentPassword?: string;
  newPassword?: string;
};

export async function updateUserProfile(userId: string, input: UpdateProfileInput) {
  const user = await findUserById(userId);

  if (!user) {
    throw new AppError(404, "USER_NOT_FOUND", "Utilisateur introuvable.");
  }

  const data: { email?: string; passwordHash?: string } = {};

  if (typeof input.email === "string") {
    const normalizedEmail = normalizeEmail(input.email);

    if (normalizedEmail !== user.email) {
      const existingUser = await findUserByEmail(normalizedEmail);
      if (existingUser && existingUser.id !== user.id) {
        throw new AppError(409, "EMAIL_ALREADY_USED", "Cet email est deja utilise.");
      }

      data.email = normalizedEmail;
    }
  }

  if (input.newPassword) {
    if (!input.currentPassword) {
      throw new AppError(400, "INVALID_INPUT", "Mot de passe actuel requis.");
    }

    const isValidCurrentPassword = await verifyPassword(
      input.currentPassword,
      user.passwordHash,
    );

    if (!isValidCurrentPassword) {
      throw new AppError(401, "INVALID_CREDENTIALS", "Mot de passe actuel invalide.");
    }

    data.passwordHash = await hashPassword(input.newPassword);
  }

  if (!data.email && !data.passwordHash) {
    return {
      id: user.id,
      email: user.email,
      updatedAt: user.updatedAt,
    };
  }

  return prisma.user.update({
    where: { id: user.id },
    data,
    select: {
      id: true,
      email: true,
      updatedAt: true,
    },
  });
}
