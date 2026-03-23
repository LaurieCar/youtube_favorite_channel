type SearchResultsPageProps = {
  params: Promise<{ id: string }>;
};

const channels = [
  { name: "NetSec Insider", subscribers: "1,2 M d'abonnés" },
  { name: "The White Hat", subscribers: "850 k abonnés" },
  { name: "Code Defender", subscribers: "420 k abonnés" },
];

export default async function SearchResultsPage({ params }: SearchResultsPageProps) {
  const { id } = await params;

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-4xl font-bold tracking-tight">{id}</h1>
        <p className="mt-2 text-sm text-slate-500">
          Top 5 des chaînes correspondant aux mots-clés.
        </p>
      </div>

      <div className="space-y-4">
        {channels.map((channel) => (
          <article
            key={channel.name}
            className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">{channel.name}</h2>
                <p className="mt-1 text-sm text-slate-500">{channel.subscribers}</p>
                <span className="mt-3 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-700">
                  Activité vérifiée
                </span>
              </div>
              <a
                className="rounded-2xl bg-[#007aff] px-4 py-3 text-sm font-semibold text-white"
                href="#"
              >
                Ouvrir sur YouTube
              </a>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
