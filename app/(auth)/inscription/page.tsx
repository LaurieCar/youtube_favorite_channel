export default function InscriptionPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-73px)] max-w-xl flex-col justify-center px-6 py-10">
      <div className="rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-xl shadow-slate-200">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
          Créer un compte
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Commencer votre bibliothèque de chaînes.
        </h1>
        <form className="mt-8 space-y-4">
          <input
            className="w-full rounded-2xl border border-slate-200 px-4 py-4"
            placeholder="Email"
            type="email"
          />
          <input
            className="w-full rounded-2xl border border-slate-200 px-4 py-4"
            placeholder="Mot de passe"
            type="password"
          />
          <input
            className="w-full rounded-2xl border border-slate-200 px-4 py-4"
            placeholder="Confirmer le mot de passe"
            type="password"
          />
          <button className="w-full rounded-2xl bg-red-600 py-4 font-semibold text-white" type="submit">
            S&apos;inscrire
          </button>
        </form>
      </div>
    </main>
  );
}
