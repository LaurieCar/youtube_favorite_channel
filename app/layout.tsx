import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "YouTube Favorite Channel",
  description: "Bibliothèque de catégories YouTube et Top 5 de chaînes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <div className="min-h-screen">
          <header className="border-b border-black/5 bg-white/70 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              <Link className="text-lg font-semibold tracking-tight" href="/">
                ChannelFinder
              </Link>
              <nav className="flex items-center gap-5 text-sm text-slate-600">
                <Link href="/connexion">Connexion</Link>
                <Link href="/categories">Catégories</Link>
                <Link href="/compte">Compte</Link>
              </nav>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
