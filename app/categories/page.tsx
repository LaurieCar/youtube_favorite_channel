import Link from "next/link";
import { requireUser } from "@/lib/auth/session";

export default async function CategoriesPage() {
  const user = await requireUser();

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ma bibliothèque de catégories</h1>
          <p className="mt-1 text-sm text-slate-500">Connecté en tant que {user.email}</p>
        </div>
        <Link className="rounded-full bg-[#007aff] px-5 py-3 text-sm font-semibold text-white" href="/categories/nouveau">
          Nouvelle catégorie
        </Link>
      </div>

      <section className="rounded-[1.5rem] border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Votre bibliothèque est vide</h2>
        <p className="mt-2 text-sm text-slate-500">
          Commencez par créer votre première catégorie pour lancer vos recherches YouTube.
        </p>
        <Link className="mt-5 inline-flex rounded-2xl bg-[#007aff] px-5 py-3 text-sm font-semibold text-white" href="/categories/nouveau">
          Créer une catégorie
        </Link>
      </section>
    </main>
  );
}

