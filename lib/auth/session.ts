import NextAuth from "next-auth";
import { redirect } from "next/navigation";
import { authConfig } from "@/lib/auth/config";

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

function getDevBypassUser() {
  const isDevBypassEnabled =
    process.env.NODE_ENV === "development" && process.env.DEV_AUTH_BYPASS === "1";

  if (!isDevBypassEnabled) {
    return null;
  }

  return {
    id: "dev-user",
    email: "dev@example.com",
  };
}

export async function getCurrentUser() {
  const bypassUser = getDevBypassUser();
  if (bypassUser) {
    return bypassUser;
  }

  const session = await auth();
  return session?.user ?? null;
}

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/connexion");
  }

  return user;
}
