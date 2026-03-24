# Implementation Plan: Recherche de chaînes YouTube par catégories

**Branch**: `001-recherche-youtube-categories` | **Date**: 2026-03-23 | **Spec**: [`specs/001-recherche-youtube-categories/spec.md`](./spec.md)
**Input**: Feature specification from `/specs/001-recherche-youtube-categories/spec.md`

## Summary

Construire une application web fullstack en TypeScript permettant
l'authentification par email/mot de passe, le CRUD de catégories privées et la
recherche server-side d'un Top 5 de chaînes YouTube via l'API YouTube Data v3.
L'interface reprendra les maquettes existantes en Tailwind, avec une logique
claire de séparation entre UI, validation métier, accès aux données et
intégration externe.

## Technical Context

**Language/Version**: TypeScript 5.x sur Node.js 22  
**Primary Dependencies**: Next.js 15 (App Router), React 19, Tailwind CSS, Prisma ORM, Auth.js credentials provider, Zod  
**Storage**: SQLite via Prisma en développement, schéma compatible PostgreSQL pour déploiement futur  
**Testing**: Vitest, React Testing Library, Playwright  
**Target Platform**: Application web responsive pour navigateurs modernes  
**Project Type**: web application fullstack mono-repo  
**Performance Goals**: 95% des recherches restituées en moins de 5 secondes côté UX  
**Constraints**: authentification par credentials uniquement, données utilisateur privées, clé YouTube côté serveur uniquement, pas de lecture vidéo embarquée  
**Scale/Scope**: V1 mono-projet, quelques centaines d'utilisateurs, quelques dizaines de catégories par utilisateur, un seul domaine métier principal

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- ✅ Simplicité: une seule application Next.js évite la séparation frontend/backend
  prématurée et correspond aux maquettes existantes.
- ✅ Fiabilité: catégories et profil sont persistés en base locale via Prisma;
  les erreurs de recherche n'affectent jamais les données utilisateur.
- ✅ Performance: la recherche YouTube est exécutée côté serveur avec timeout,
  filtrage limité aux candidats utiles et message de repli en cas d'échec.
- ✅ Respect des données: authentification par email/mot de passe uniquement,
  hash de mot de passe, messages d'erreur non bavards, données privées par user.
- ✅ Scope V1: OAuth, notifications, favoris, géolocalisation et recommandations
  restent explicitement hors périmètre.

## Project Structure

### Documentation (this feature)

```text
specs/001-recherche-youtube-categories/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── openapi.yaml
└── tasks.md
```

### Source Code (repository root)

```text
app/
├── (auth)/
│   ├── connexion/page.tsx
│   └── inscription/page.tsx
├── categories/
│   ├── page.tsx
│   ├── nouveau/page.tsx
│   ├── [id]/page.tsx
│   └── [id]/resultats/page.tsx
├── compte/page.tsx
└── api/
    ├── auth/
    ├── profile/
    ├── categories/
    └── search/

components/
├── auth/
├── categories/
├── profile/
└── results/

lib/
├── auth/
├── db/
├── youtube/
├── validations/
└── utils/

prisma/
└── schema.prisma

tests/
├── unit/
├── integration/
└── e2e/
```

**Structure Decision**: choix d'une application Next.js unique avec App Router.
Cette structure réduit la complexité de déploiement, garde l'UI et les routes
serveur proches du domaine, et permet d'implémenter rapidement les maquettes
fournies sans introduire de duplication entre frontend et backend.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Aucun | N/A | N/A |
