# YouTube Favorite Channel

Application web de veille YouTube permettant à un utilisateur de créer des
catégories privées et d'obtenir un Top 5 de chaînes pertinentes par sujet.

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- Prisma
- Auth.js
- Zod
- Vitest
- Playwright

## Documentation Projet

- Cadrage: [`docs/cadrage.md`](./docs/cadrage.md)
- UX Research: [`docs/ux-research.md`](./docs/ux-research.md)
- PRD: [`docs/prd.md`](./docs/prd.md)
- Architecture: [`docs/architecture.md`](./docs/architecture.md)
- Tests: [`docs/tests.md`](./docs/tests.md)
- Prototypage: [`docs/prototypage.md`](./docs/prototypage.md)
- Chaîne IA: [`docs/chaine-ia.md`](./docs/chaine-ia.md)

## Artefacts Spec Kit

- Constitution: [`.specify/memory/constitution.md`](./.specify/memory/constitution.md)
- Spec feature: [`specs/001-recherche-youtube-categories/spec.md`](./specs/001-recherche-youtube-categories/spec.md)
- Plan: [`specs/001-recherche-youtube-categories/plan.md`](./specs/001-recherche-youtube-categories/plan.md)
- Tasks: [`specs/001-recherche-youtube-categories/tasks.md`](./specs/001-recherche-youtube-categories/tasks.md)

## Lancer le projet

```bash
npm install
npx prisma generate
npm run dev
```

## Variables d'environnement

Copier `.env.example` vers `.env.local` et renseigner:

- `DATABASE_URL`
- `AUTH_SECRET`
- `YOUTUBE_API_KEY`
- `YOUTUBE_API_BASE_URL`

## État du projet

Le scaffold applicatif et les fondations techniques sont en place.
L'implémentation fonctionnelle des user stories est en cours.
