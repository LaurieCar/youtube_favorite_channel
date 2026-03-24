# Architecture Technique

## Choix Global

Le projet repose sur une architecture web fullstack mono-repo avec Next.js.

## Stack Retenue

- Frontend: Next.js App Router + React + Tailwind CSS
- Backend applicatif: routes API Next.js
- Base de données: Prisma ORM + SQLite en développement
- Authentification: Auth.js credentials provider
- Validation: Zod
- Tests: Vitest + Playwright

## Justification

### Next.js fullstack

- réduit la complexité de démarrage
- garde les écrans et les API proches du domaine
- convient bien à une V1 avec peu d'écrans et un seul domaine métier

### Prisma

- rend le modèle de données explicite
- permet une évolution simple du schéma
- offre une base claire pour produire un MLD et migrer plus tard

### Auth.js

- évite de réinventer totalement la gestion de session
- reste compatible avec une authentification credentials
- peut évoluer plus tard si le besoin change

### Tailwind CSS

- permet de traduire facilement les maquettes Stitch
- accélère le prototypage et l'implémentation d'écrans

## Modules Principaux

- `app/`: écrans et routes API
- `lib/auth/`: règles d'authentification et sessions
- `lib/db/`: accès base de données
- `lib/validations/`: validation des entrées
- `lib/youtube/`: intégration YouTube côté serveur
- `prisma/`: schéma relationnel

## Contraintes d'Architecture

- clé YouTube jamais exposée au navigateur
- auth limitée au mode email/mot de passe en V1
- données utilisateur privées
- erreurs de recherche sans impact sur les catégories et le profil

## Évolutivité Prévue

L'architecture permet l'ajout futur de:
- favoris
- notifications
- historique de recherche
- migration SQLite vers PostgreSQL
