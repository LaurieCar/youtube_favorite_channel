import Link from "next/link";

const categories = [
  {
    id: "cybersecurite",
    name: "Cybersécurité",
    keywords: "hacking, security, malware, pentest",
  },
  {
    id: "cuisine",
    name: "Cuisine",
    keywords: "recettes, gastronomie, chef, pâtisserie",
  },
  {
    id: "gaming",
    name: "Gaming",
    keywords: "gameplay, esports, let's play, console",
  },
  {
    id: "ia-tech",
    name: "IA & Tech",
    keywords: "IA, machine learning, tech news, gadgets",
  },
];

export default function CategoriesPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ma bibliothèque de catégories</h1>
          <p className="mt-1 text-sm text-slate-500">
            Structurez vos sujets puis lancez une recherche Top 5.
          </p>
        </div>
        <Link className="rounded-full bg-[#007aff] px-5 py-3 text-sm font-semibold text-white" href="/categories/nouveau">
          Nouvelle catégorie
        </Link>
      </div>

      <div className="space-y-4">
        {categories.map((category) => (
          <article
            key={category.id}
            className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">{category.name}</h2>
                <p className="mt-2 text-sm italic text-slate-500">
                  Mots-clés : {category.keywords}
                </p>
              </div>
              <div className="flex gap-2">
                <a className="rounded-full bg-blue-50 px-3 py-2 text-sm text-[#007aff]" href={`/categories/${category.id}`}>
                  Modifier
                </a>
                <button className="rounded-full bg-red-50 px-3 py-2 text-sm text-red-600" type="button">
                  Supprimer
                </button>
              </div>
            </div>
            <a
              className="mt-4 inline-flex rounded-2xl bg-[#007aff] px-5 py-3 text-sm font-semibold text-white"
              href={`/categories/${category.id}/resultats`}
            >
              Rechercher le Top 5
            </a>
          </article>
        ))}
      </div>
    </main>
  );
}
