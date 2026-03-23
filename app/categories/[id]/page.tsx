type CategoryEditPageProps = {
  params: Promise<{ id: string }>;
};

export default async function CategoryEditPage({ params }: CategoryEditPageProps) {
  const { id } = await params;

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#007aff]">
          Gérer la catégorie
        </p>
        <h1 className="text-3xl font-bold tracking-tight">{id}</h1>
        <p className="mt-2 text-sm text-slate-500">
          Écran prêt pour intégrer le formulaire CRUD catégorie et les synonymes.
        </p>
      </div>
    </main>
  );
}
