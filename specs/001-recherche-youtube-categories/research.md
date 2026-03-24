# Research - Recherche de chaînes YouTube par catégories

## Decision 1: Utiliser une application Next.js fullstack

**Decision**: Centraliser UI, routes serveur et rendu dans une seule application
Next.js.

**Rationale**: Le projet est une V1 à périmètre réduit avec quelques écrans
clairs, des actions utilisateur standard et une seule intégration externe
principale. Une application unique limite le coût d'orchestration et accélère
la livraison.

**Alternatives considered**:
- React + Express séparés: plus de complexité, peu de valeur à ce stade.
- NestJS + frontend séparé: robuste, mais surdimensionné pour la V1.

## Decision 2: Authentification par credentials avec Auth.js

**Decision**: Implémenter une authentification email/mot de passe via Auth.js
et un stockage local des utilisateurs.

**Rationale**: Le scope impose des credentials, pas d'OAuth. Auth.js fournit une
base standard pour les sessions, tout en laissant le contrôle sur les règles
métier du mot de passe.

**Alternatives considered**:
- Auth maison complète: trop risqué et répétitif.
- OAuth Google: hors scope V1.

## Decision 3: Prisma ORM avec SQLite en développement

**Decision**: Utiliser Prisma avec SQLite pour le démarrage local, en gardant un
modèle de données compatible PostgreSQL.

**Rationale**: SQLite simplifie le bootstrap et évite d'imposer immédiatement
une infrastructure externe. Prisma offre une migration fluide vers PostgreSQL si
nécessaire ensuite.

**Alternatives considered**:
- PostgreSQL dès le départ: plus réaliste en prod, mais plus lourd pour le
  démarrage du projet.
- Fichiers JSON: trop fragile pour l'authentification et les relations.

## Decision 4: Recherche YouTube uniquement côté serveur

**Decision**: Appeler l'API YouTube Data v3 depuis le serveur uniquement.

**Rationale**: Cela protège la clé API, évite l'exposition du contrat externe au
frontend et permet de centraliser les règles d'éligibilité et de classement.

**Alternatives considered**:
- Appels directs depuis le navigateur: rejeté pour raison de sécurité.
- Pré-calcul en batch: inutile pour une V1 interactive.

## Decision 5: Tailwind CSS comme couche UI

**Decision**: Reprendre les maquettes HTML/Tailwind comme base visuelle des
écrans React.

**Rationale**: Les maquettes existantes sont déjà structurées en utilitaires
Tailwind. Cela réduit le coût de traduction vers l'application réelle.

**Alternatives considered**:
- CSS Modules purs: plus long à traduire depuis les maquettes.
- UI kit externe complet: risque de s'éloigner du rendu attendu.
