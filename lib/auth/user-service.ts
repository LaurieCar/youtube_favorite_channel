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
