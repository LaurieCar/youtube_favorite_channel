"use client";

import { FormEvent, useState } from "react";

type ApiErrorPayload = {
  error?: {
    code?: string;
    message?: string;
  };
};

type ProfileFormProps = {
  initialEmail: string;
};

export function ProfileForm({ initialEmail }: ProfileFormProps) {
  const [email, setEmail] = useState(initialEmail);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailMessage, setEmailMessage] = useState<string | null>(null);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isSavingEmail, setIsSavingEmail] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  async function updateProfile(payload: Record<string, string>) {
    const response = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorPayload = (await response.json()) as ApiErrorPayload;
      throw new Error(errorPayload.error?.message ?? "Impossible de mettre a jour le profil.");
    }

    return response.json();
  }

  async function handleEmailSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEmailError(null);
    setEmailMessage(null);
    setIsSavingEmail(true);

    try {
      const result = await updateProfile({ email });
      setEmail(result?.data?.email ?? email);
      setEmailMessage("Email mis a jour.");
    } catch (error) {
      setEmailError(error instanceof Error ? error.message : "Erreur inconnue.");
    } finally {
      setIsSavingEmail(false);
    }
  }

  async function handlePasswordSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPasswordError(null);
    setPasswordMessage(null);
    setIsSavingPassword(true);

    try {
      await updateProfile({
        currentPassword,
        newPassword,
        confirmPassword,
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordMessage("Mot de passe mis a jour.");
    } catch (error) {
      setPasswordError(error instanceof Error ? error.message : "Erreur inconnue.");
    } finally {
      setIsSavingPassword(false);
    }
  }

  return (
    <div className="space-y-6">
      <form className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm" onSubmit={handleEmailSubmit}>
        <h2 className="text-xl font-semibold text-slate-900">Modifier l&apos;email</h2>
        <p className="mt-1 text-sm text-slate-500">Utilisez une adresse email unique.</p>

        <div className="mt-4 space-y-2">
          <label className="block text-sm font-medium text-slate-700" htmlFor="profile-email">
            Email
          </label>
          <input
            id="profile-email"
            type="email"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none ring-red-500 focus:ring-2"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        {emailError ? <p className="mt-3 text-sm text-red-600">{emailError}</p> : null}
        {emailMessage ? <p className="mt-3 text-sm text-emerald-700">{emailMessage}</p> : null}

        <button
          type="submit"
          className="mt-4 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isSavingEmail}
        >
          {isSavingEmail ? "Mise a jour..." : "Mettre a jour l&apos;email"}
        </button>
      </form>

      <form className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm" onSubmit={handlePasswordSubmit}>
        <h2 className="text-xl font-semibold text-slate-900">Modifier le mot de passe</h2>
        <p className="mt-1 text-sm text-slate-500">Minimum 8 caracteres, 1 majuscule et 1 chiffre.</p>

        <div className="mt-4 space-y-3">
          <input
            type="password"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none ring-red-500 focus:ring-2"
            placeholder="Mot de passe actuel"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            required
          />
          <input
            type="password"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none ring-red-500 focus:ring-2"
            placeholder="Nouveau mot de passe"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            required
          />
          <input
            type="password"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none ring-red-500 focus:ring-2"
            placeholder="Confirmer le nouveau mot de passe"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
        </div>

        {passwordError ? <p className="mt-3 text-sm text-red-600">{passwordError}</p> : null}
        {passwordMessage ? <p className="mt-3 text-sm text-emerald-700">{passwordMessage}</p> : null}

        <button
          type="submit"
          className="mt-4 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isSavingPassword}
        >
          {isSavingPassword ? "Mise a jour..." : "Mettre a jour le mot de passe"}
        </button>
      </form>
    </div>
  );
}
