"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";

export default function ConnexionPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [callbackUrl, setCallbackUrl] = useState("/categories");
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const callback = params.get("callbackUrl");
    const initialEmail = params.get("email");

    if (callback && callback.startsWith("/")) {
      setCallbackUrl(callback);
    }

    if (initialEmail) {
      setEmail(initialEmail);
    }

    setRegistered(params.get("registered") === "1");
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    setIsLoading(false);

    if (!result || result.error) {
      setError("Identifiants invalides.");
      return;
    }

    window.location.href = result.url ?? callbackUrl;
  }

  return (
    <main className="flex min-h-[calc(100vh-73px)] items-center justify-center px-6 py-10">
      <div className="w-full max-w-sm rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-xl shadow-red-100">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600 text-3xl text-white shadow-lg">
            ▶
          </div>
          <h1 className="text-3xl font-bold tracking-tight">ChannelFinder</h1>
          <p className="mt-2 text-sm text-slate-500">Découvrez le meilleur de YouTube par catégories.</p>
        </div>

        {registered ? (
          <p className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            Compte créé. Connectez-vous pour accéder à votre bibliothèque.
          </p>
        ) : null}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700" htmlFor="email">
              Email
            </label>
            <input
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 outline-none ring-red-500 transition focus:ring-2"
              id="email"
              name="email"
              placeholder="votre@email.com"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-slate-700" htmlFor="password">
                Mot de passe
              </label>
            </div>
            <input
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 outline-none ring-red-500 transition focus:ring-2"
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <p className="text-xs text-slate-400">Min. 8 caractères, 1 majuscule, 1 chiffre.</p>
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            className="w-full rounded-2xl bg-red-600 py-4 text-base font-semibold text-white shadow-lg shadow-red-200 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-600">
          Pas encore de compte ?{" "}
          <Link className="font-semibold text-red-600" href="/inscription">
            S&apos;inscrire
          </Link>
        </p>
      </div>
    </main>
  );
}
