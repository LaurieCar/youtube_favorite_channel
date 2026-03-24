import { ProfileForm } from "@/components/profile/profile-form";
import { requireUser } from "@/lib/auth/session";

export default async function ComptePage() {
  const user = await requireUser();

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-red-600">Profil</p>
        <h1 className="text-3xl font-bold tracking-tight">Mon compte</h1>
        <p className="mt-2 text-sm text-slate-500">Connecte en tant que {user.email}</p>
      </div>

      <ProfileForm initialEmail={user.email ?? ""} />
    </main>
  );
}
