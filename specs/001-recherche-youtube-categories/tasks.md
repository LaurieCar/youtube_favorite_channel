# Tasks: Recherche de chaînes YouTube par catégories

**Input**: Design documents from `/specs/001-recherche-youtube-categories/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/openapi.yaml

**Tests**: Les tests sont inclus car le projet vise une implémentation fiable de
l'authentification, du CRUD catégorie et de la recherche Top 5.

**Organization**: Les tâches sont regroupées par user story afin de permettre
une implémentation et une validation incrémentales.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialiser l'application, l'outillage et la structure commune.

- [ ] T001 Créer le squelette Next.js TypeScript à la racine du repo
- [ ] T002 Configurer les dépendances principales dans `package.json`
- [ ] T003 [P] Configurer Tailwind et les styles globaux dans `app/globals.css`
- [ ] T004 [P] Configurer ESLint, TypeScript et scripts NPM dans `package.json`, `tsconfig.json` et `eslint.config.*`
- [ ] T005 [P] Créer l'arborescence applicative initiale dans `app/`, `components/`, `lib/`, `prisma/` et `tests/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Mettre en place les briques transverses qui bloquent toutes les stories.

- [ ] T006 Créer le schéma Prisma initial dans `prisma/schema.prisma`
- [ ] T007 [P] Configurer le client Prisma dans `lib/db/prisma.ts`
- [ ] T008 [P] Configurer les variables d'environnement serveur dans `.env.example` et `lib/utils/env.ts`
- [ ] T009 [P] Mettre en place la validation partagée avec Zod dans `lib/validations/auth.ts`, `lib/validations/category.ts` et `lib/validations/profile.ts`
- [ ] T010 Implémenter la gestion centralisée des erreurs et réponses API dans `lib/utils/errors.ts` et `lib/utils/http.ts`
- [ ] T011 Implémenter la couche Auth.js credentials dans `lib/auth/config.ts`, `lib/auth/session.ts` et `app/api/auth/[...nextauth]/route.ts`
- [ ] T012 Créer les helpers YouTube côté serveur dans `lib/youtube/client.ts` et `lib/youtube/search-service.ts`
- [ ] T013 Initialiser les bases de tests dans `vitest.config.ts`, `playwright.config.ts` et `tests/setup.ts`

**Checkpoint**: Fondation prête, les stories peuvent démarrer.

---

## Phase 3: User Story 1 - S'inscrire et accéder à sa bibliothèque (Priority: P1) 🎯 MVP

**Goal**: Permettre l'inscription, la connexion et l'accès à une bibliothèque privée vide.

**Independent Test**: Un visiteur crée un compte, se connecte puis accède à la
page catégories sans voir les données d'un autre utilisateur.

### Tests for User Story 1

- [ ] T014 [P] [US1] Ajouter les tests unitaires de validation auth dans `tests/unit/auth.validation.test.ts`
- [ ] T015 [P] [US1] Ajouter le test d'intégration d'inscription/connexion dans `tests/integration/auth.flow.test.ts`
- [ ] T016 [P] [US1] Ajouter le test e2e du parcours connexion dans `tests/e2e/auth.spec.ts`

### Implementation for User Story 1

- [ ] T017 [P] [US1] Créer les modèles Prisma utilisateur et session dans `prisma/schema.prisma`
- [ ] T018 [US1] Implémenter la route d'inscription dans `app/api/auth/register/route.ts`
- [ ] T019 [US1] Implémenter la page d'inscription dans `app/(auth)/inscription/page.tsx`
- [ ] T020 [US1] Implémenter la page de connexion depuis la maquette dans `app/(auth)/connexion/page.tsx`
- [ ] T021 [US1] Ajouter la protection de route et la redirection session dans `middleware.ts` et `lib/auth/session.ts`
- [ ] T022 [US1] Créer la page bibliothèque vide protégée dans `app/categories/page.tsx`

**Checkpoint**: Inscription et connexion fonctionnent de manière autonome.

---

## Phase 4: User Story 2 - Gérer ses catégories personnelles (Priority: P1)

**Goal**: Permettre à l'utilisateur connecté de créer, modifier et supprimer ses catégories.

**Independent Test**: Un utilisateur connecté crée, modifie puis supprime une
catégorie sans impact sur ses autres données.

### Tests for User Story 2

- [ ] T023 [P] [US2] Ajouter les tests unitaires de validation catégorie dans `tests/unit/category.validation.test.ts`
- [ ] T024 [P] [US2] Ajouter le test d'intégration CRUD catégorie dans `tests/integration/categories.crud.test.ts`
- [ ] T025 [P] [US2] Ajouter le test e2e bibliothèque/catégorie dans `tests/e2e/categories.spec.ts`

### Implementation for User Story 2

- [ ] T026 [P] [US2] Ajouter les modèles Prisma `Category` et `CategoryKeyword` dans `prisma/schema.prisma`
- [ ] T027 [US2] Implémenter le repository/service catégorie dans `lib/db/category-repository.ts` et `lib/categories/category-service.ts`
- [ ] T028 [US2] Implémenter les routes `GET` et `POST` dans `app/api/categories/route.ts`
- [ ] T029 [US2] Implémenter les routes `PATCH` et `DELETE` dans `app/api/categories/[id]/route.ts`
- [ ] T030 [US2] Implémenter la page bibliothèque avec liste des catégories dans `app/categories/page.tsx`
- [ ] T031 [US2] Implémenter la page de création catégorie dans `app/categories/nouveau/page.tsx`
- [ ] T032 [US2] Implémenter la page d'édition catégorie depuis la maquette dans `app/categories/[id]/page.tsx`
- [ ] T033 [US2] Ajouter les composants réutilisables catégorie dans `components/categories/category-card.tsx`, `components/categories/category-form.tsx` et `components/categories/delete-category-dialog.tsx`

**Checkpoint**: Le CRUD catégorie est complet et testable sans lancer la recherche.

---

## Phase 5: User Story 3 - Rechercher le Top 5 de chaînes (Priority: P1)

**Goal**: Exécuter une recherche YouTube par catégorie et afficher jusqu'à 5 chaînes éligibles.

**Independent Test**: Depuis une catégorie existante, l'utilisateur obtient des
résultats triés ou un message d'absence de résultat avec action de réessai.

### Tests for User Story 3

- [ ] T034 [P] [US3] Ajouter les tests unitaires de filtrage/classement YouTube dans `tests/unit/youtube-search-service.test.ts`
- [ ] T035 [P] [US3] Ajouter le test d'intégration de recherche catégorie dans `tests/integration/category-search.test.ts`
- [ ] T036 [P] [US3] Ajouter le test e2e des résultats Top 5 dans `tests/e2e/search-results.spec.ts`

### Implementation for User Story 3

- [ ] T037 [P] [US3] Ajouter le modèle Prisma `SearchExecution` si retenu dans `prisma/schema.prisma`
- [ ] T038 [US3] Finaliser le service de recherche YouTube et les règles d'éligibilité dans `lib/youtube/search-service.ts`
- [ ] T039 [US3] Implémenter la route de recherche dans `app/api/categories/[id]/search/route.ts`
- [ ] T040 [US3] Implémenter la page résultats depuis la maquette dans `app/categories/[id]/resultats/page.tsx`
- [ ] T041 [US3] Ajouter les composants résultat dans `components/results/channel-result-card.tsx` et `components/results/search-state.tsx`
- [ ] T042 [US3] Ajouter le bouton d'action de recherche depuis la bibliothèque dans `components/categories/category-card.tsx`
- [ ] T043 [US3] Gérer les cas zéro résultat, résultat partiel et erreur temporaire dans `lib/youtube/search-service.ts` et `components/results/search-state.tsx`

**Checkpoint**: Le parcours coeur "catégorie -> recherche -> Top 5" est complet.

---

## Phase 6: User Story 4 - Mettre à jour son profil (Priority: P2)

**Goal**: Permettre la mise à jour sécurisée de l'email et du mot de passe.

**Independent Test**: Un utilisateur connecté modifie son email ou son mot de
passe depuis son compte avec validation correcte.

### Tests for User Story 4

- [ ] T044 [P] [US4] Ajouter les tests unitaires de validation profil dans `tests/unit/profile.validation.test.ts`
- [ ] T045 [P] [US4] Ajouter le test d'intégration de mise à jour profil dans `tests/integration/profile-update.test.ts`
- [ ] T046 [P] [US4] Ajouter le test e2e page compte dans `tests/e2e/profile.spec.ts`

### Implementation for User Story 4

- [ ] T047 [US4] Implémenter la route profil dans `app/api/profile/route.ts`
- [ ] T048 [US4] Implémenter la page compte depuis la maquette dans `app/compte/page.tsx`
- [ ] T049 [US4] Ajouter le composant formulaire profil dans `components/profile/profile-form.tsx`
- [ ] T050 [US4] Ajouter les règles de changement email/mot de passe dans `lib/auth/user-service.ts`

**Checkpoint**: Le profil utilisateur est autonome et conforme au scope V1.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Finaliser la qualité, la sécurité et la cohérence produit.

- [ ] T051 [P] Documenter l'installation et les variables d'environnement dans `README.md`
- [ ] T052 Harmoniser les écrans avec les maquettes dans `app/` et `components/`
- [ ] T053 Optimiser les temps de recherche et les timeouts dans `lib/youtube/search-service.ts`
- [ ] T054 [P] Renforcer les tests d'autorisation d'accès aux données dans `tests/integration/authorization.test.ts`
- [ ] T055 Vérifier les messages d'erreur non sensibles dans `app/api/` et `components/`
- [ ] T056 Exécuter les scénarios de `specs/001-recherche-youtube-categories/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1**: démarre immédiatement
- **Phase 2**: dépend de la fin de la Phase 1
- **Phases 3 à 6**: dépendent de la fin de la Phase 2
- **Phase 7**: dépend des stories souhaitées

### User Story Dependencies

- **US1**: aucune dépendance sur les autres stories après la fondation
- **US2**: dépend de l'authentification opérationnelle
- **US3**: dépend de l'existence du CRUD catégorie
- **US4**: dépend de l'authentification opérationnelle

### Parallel Opportunities

- Les tâches `[P]` de setup et de fondation peuvent être lancées en parallèle.
- Après la Phase 2, US2 et US4 peuvent avancer en parallèle.
- Les tests `[P]` de chaque story peuvent être préparés en parallèle de la mise
  en place des modèles associés.

## Implementation Strategy

### MVP First

1. Finir Setup
2. Finir Foundation
3. Livrer US1
4. Livrer US2
5. Livrer US3
6. Valider le parcours complet

### Incremental Delivery

1. Authentification
2. Bibliothèque et catégories
3. Recherche Top 5
4. Profil
5. Polish final
