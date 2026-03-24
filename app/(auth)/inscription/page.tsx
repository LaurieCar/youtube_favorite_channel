"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type RegisterErrorPayload = {
  error?: {
    code?: string;
    message?: string;
  };
};

export default function InscriptionPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, confirmPassword }),
      });

      if (!response.ok) {
        const payload = (await response.json()) as RegisterErrorPayload;
        setError(payload.error?.message ?? "Impossible de finaliser l'inscription.");
        return;
      }

      router.push(`/connexion?registered=1&email=${encodeURIComponent(email.trim())}`);
    } catch {
      setError("Une erreur réseau est survenue. Réessayez.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-73px)] max-w-xl flex-col justify-center px-6 py-10">
      <div className="rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-xl shadow-slate-200">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-red-600">Créer un compte</p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Commencer votre bibliothèque de chaînes.
        </h1>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <input
            className="w-full rounded-2xl border border-slate-200 px-4 py-4"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <input
            className="w-full rounded-2xl border border-slate-200 px-4 py-4"
            placeholder="Mot de passe"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <input
            className="w-full rounded-2xl border border-slate-200 px-4 py-4"
            placeholder="Confirmer le mot de passe"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <button
            className="w-full rounded-2xl bg-red-600 py-4 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Inscription..." : "S'inscrire"}
          </button>
        </form>
        <p className="mt-4 text-sm text-slate-600">
          Déjà un compte ?{" "}
          <Link className="font-semibold text-red-600" href="/connexion">
            Se connecter
          </Link>
        </p>
      </div>
    </main>
  );
}

