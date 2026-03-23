export default function ConnexionPage() {
  return (
    <main className="flex min-h-[calc(100vh-73px)] items-center justify-center px-6 py-10">
      <div className="w-full max-w-sm rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-xl shadow-red-100">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600 text-3xl text-white shadow-lg">
            ▶
          </div>
          <h1 className="text-3xl font-bold tracking-tight">ChannelFinder</h1>
          <p className="mt-2 text-sm text-slate-500">
            Découvrez le meilleur de YouTube par catégories.
          </p>
        </div>

        <form className="space-y-4">
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
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-slate-700" htmlFor="password">
                Mot de passe
              </label>
              <button className="text-xs font-medium text-red-600" type="button">
                Oublié ?
              </button>
            </div>
            <input
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 outline-none ring-red-500 transition focus:ring-2"
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
            />
            <p className="text-xs text-slate-400">
              Min. 8 caractères, 1 majuscule, 1 chiffre.
            </p>
          </div>

          <button
            className="w-full rounded-2xl bg-red-600 py-4 text-base font-semibold text-white shadow-lg shadow-red-200 transition hover:opacity-95"
            type="submit"
          >
            Se connecter
          </button>
        </form>
      </div>
    </main>
  );
}
