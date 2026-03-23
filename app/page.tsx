import Link from "next/link";

const routes = [
  { href: "/connexion", label: "Connexion" },
  { href: "/inscription", label: "Inscription" },
  { href: "/categories", label: "Bibliothèque" },
  { href: "/categories/nouveau", label: "Nouvelle catégorie" },
  { href: "/categories/demo", label: "Modifier une catégorie" },
  { href: "/categories/demo/resultats", label: "Résultats Top 5" },
  { href: "/compte", label: "Mon compte" },
];

export default function HomePage() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-white/60 bg-white/80 p-8 shadow-sm">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
            V1 Planning Ready
          </p>
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-slate-900">
            Application YouTube de veille thématique avec authentification,
            catégories privées et recherche Top 5.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Le scaffold Next.js est en place. Les pages reprennent les maquettes
            et servent de base d&apos;intégration pour l&apos;authentification,
            le CRUD catégories et la recherche YouTube côté serveur.
          </p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-sm">
          <p className="text-sm uppercase tracking-[0.18em] text-slate-400">
            Étape suivante
          </p>
          <p className="mt-3 text-2xl font-semibold">Brancher l&apos;auth et Prisma</p>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Les écrans et le schéma existent déjà. La prochaine couche utile est la
            persistance et la session utilisateur.
          </p>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <p className="text-lg font-semibold text-slate-900">{route.label}</p>
            <p className="mt-1 text-sm text-slate-500">{route.href}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
