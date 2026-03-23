export default function NouvelleCategoriePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#007aff]">
          Créer
        </p>
        <h1 className="text-3xl font-bold tracking-tight">Nouvelle catégorie</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          Ajoutez un nom et plusieurs mots-clés pour définir précisément votre sujet.
        </p>
      </div>
    </main>
  );
}
