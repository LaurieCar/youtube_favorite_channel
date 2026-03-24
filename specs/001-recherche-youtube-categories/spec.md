# Feature Specification: Recherche de chaînes YouTube par catégories

**Feature Branch**: `001-recherche-youtube-categories`  
**Created**: 2026-03-23  
**Status**: Draft  
**Input**: User description: "Créer une application web V1 permettant à un utilisateur de s'inscrire, gérer ses catégories YouTube et obtenir un Top 5 de chaînes pertinentes par catégorie."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - S'inscrire et accéder à sa bibliothèque (Priority: P1)

En tant que visiteur, je veux créer un compte puis me connecter avec mon email
et mon mot de passe afin d'accéder à un espace personnel sécurisé.

**Why this priority**: Sans authentification, il n'y a ni espace privé, ni
catégories utilisateur, ni recherche exploitable.

**Independent Test**: Un visiteur peut créer un compte valide, se connecter avec
les bons identifiants, puis voir sa bibliothèque vide sans aide externe.

**Acceptance Scenarios**:

1. **Given** un visiteur sans compte, **When** il soumet un email unique et un
   mot de passe conforme, **Then** le compte est créé et il peut se connecter.
2. **Given** un email déjà utilisé, **When** le visiteur tente de s'inscrire,
   **Then** l'application refuse la création avec un message clair.
3. **Given** un utilisateur existant, **When** il saisit des identifiants
   corrects, **Then** il accède à sa bibliothèque.
4. **Given** un utilisateur existant, **When** il saisit des identifiants
   incorrects, **Then** l'application affiche un message générique sans révéler
   si l'email existe.

---

### User Story 2 - Gérer ses catégories personnelles (Priority: P1)

En tant qu'utilisateur connecté, je veux créer, modifier et supprimer mes
catégories avec leurs mots-clés afin d'organiser mes sujets de veille.

**Why this priority**: La bibliothèque de catégories est le coeur métier de V1
et doit exister avant la recherche.

**Independent Test**: Un utilisateur connecté peut créer une catégorie, la
modifier, puis la supprimer avec confirmation, sans perte de données annexe.

**Acceptance Scenarios**:

1. **Given** un utilisateur connecté, **When** il crée une catégorie avec un nom
   unique et des mots-clés, **Then** la catégorie apparaît dans sa bibliothèque.
2. **Given** une catégorie existante du même nom, **When** l'utilisateur tente
   d'en créer une seconde, **Then** la création est refusée avec un message
   explicite.
3. **Given** une catégorie existante, **When** l'utilisateur modifie son nom ou
   ses mots-clés, **Then** la bibliothèque reflète immédiatement les changements.
4. **Given** une catégorie existante, **When** l'utilisateur confirme sa
   suppression, **Then** la catégorie disparaît de sa bibliothèque.

---

### User Story 3 - Rechercher le Top 5 de chaînes (Priority: P1)

En tant qu'utilisateur connecté, je veux lancer une recherche sur une catégorie
afin d'obtenir jusqu'à 5 chaînes YouTube pertinentes, actives et populaires.

**Why this priority**: C'est la promesse principale du produit.

**Independent Test**: Un utilisateur connecté peut lancer une recherche depuis
une catégorie et obtenir une liste triée ou un message d'absence de résultat.

**Acceptance Scenarios**:

1. **Given** une catégorie avec mots-clés, **When** l'utilisateur lance la
   recherche, **Then** l'application affiche jusqu'à 5 chaînes triées par nombre
   d'abonnés décroissant.
2. **Given** une chaîne candidate, **When** elle n'a pas de vidéo récente ou
   aucune vidéo récente au-dessus de 10 000 vues, **Then** elle est exclue du
   résultat final.
3. **Given** moins de 5 chaînes éligibles, **When** la recherche se termine,
   **Then** l'application affiche seulement les résultats disponibles sans erreur.
4. **Given** aucune chaîne éligible, **When** la recherche se termine, **Then**
   l'application affiche "Aucune chaîne trouvée" et une suggestion d'ajuster les
   mots-clés.
5. **Given** une erreur temporaire côté récupération YouTube, **When** la
   recherche échoue, **Then** l'application affiche un message clair avec une
   action "Réessayer".

---

### User Story 4 - Mettre à jour son profil (Priority: P2)

En tant qu'utilisateur connecté, je veux modifier mon email ou mon mot de passe
afin de garder mon compte à jour.

**Why this priority**: Fonction importante de V1, mais secondaire par rapport au
parcours d'inscription, de catégories et de recherche.

**Independent Test**: Un utilisateur connecté peut modifier son email et son mot
de passe depuis son écran profil avec validation des règles de sécurité.

**Acceptance Scenarios**:

1. **Given** un utilisateur connecté, **When** il modifie son email avec une
   valeur unique valide, **Then** le changement est enregistré.
2. **Given** un utilisateur connecté, **When** il saisit un mot de passe non
   conforme, **Then** l'application refuse la modification et rappelle les règles
   attendues.
3. **Given** un utilisateur connecté, **When** il saisit un nouveau mot de passe
   valide avec confirmation correcte, **Then** le mot de passe est mis à jour.

### Edge Cases

- Que se passe-t-il si une catégorie contient des accents, apostrophes ou
  caractères spéciaux ?
- Que se passe-t-il si le nom est dupliqué à casse différente chez un même
  utilisateur ?
- Comment le système réagit-il si l'API YouTube renvoie des données partielles
  pour une chaîne candidate ?
- Comment le système réagit-il si la recherche dépasse le budget temps visé de
  5 secondes ?
- Que se passe-t-il si l'utilisateur tente de supprimer une catégorie puis annule
  la confirmation ?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Le système MUST permettre la création de compte avec email
  obligatoire et mot de passe conforme.
- **FR-002**: Le système MUST permettre la connexion par email et mot de passe.
- **FR-003**: Le système MUST stocker les mots de passe de manière sécurisée.
- **FR-004**: Le système MUST empêcher l'inscription avec un email déjà utilisé.
- **FR-005**: Le système MUST imposer un mot de passe d'au moins 8 caractères,
  contenant au moins 1 majuscule et 1 chiffre.
- **FR-006**: Le système MUST fournir une bibliothèque privée de catégories pour
  chaque utilisateur authentifié.
- **FR-007**: Le système MUST permettre de créer, modifier et supprimer une
  catégorie avec un nom et une liste de mots-clés.
- **FR-008**: Le système MUST empêcher les doublons de nom de catégorie pour un
  même utilisateur.
- **FR-009**: Le système MUST accepter les accents et caractères spéciaux dans
  les noms et mots-clés.
- **FR-010**: Le système MUST lancer une recherche à partir d'une catégorie.
- **FR-011**: Le système MUST considérer une chaîne comme candidate si son nom
  correspond aux mots-clés, ou si au moins 5 titres de vidéos récentes
  contiennent un mot-clé ou synonyme.
- **FR-012**: Le système MUST exclure toute chaîne dont l'éligibilité récente ne
  peut pas être vérifiée.
- **FR-013**: Le système MUST considérer comme éligible une chaîne ayant au
  moins 1 vidéo publiée dans les 3 derniers mois et au moins 1 vidéo de cette
  période dépassant 10 000 vues.
- **FR-014**: Le système MUST classer les chaînes éligibles par nombre
  d'abonnés décroissant.
- **FR-015**: Le système MUST afficher jusqu'à 5 résultats avec nom de chaîne,
  nombre d'abonnés, indicateur d'activité récente et lien YouTube.
- **FR-016**: Le système MUST afficher un message utile si aucun résultat n'est
  trouvé.
- **FR-017**: Le système MUST proposer une action de réessai en cas d'erreur
  temporaire de récupération.
- **FR-018**: Le système MUST permettre à l'utilisateur connecté de mettre à
  jour son email.
- **FR-019**: Le système MUST permettre à l'utilisateur connecté de mettre à
  jour son mot de passe avec confirmation.

### Key Entities *(include if feature involves data)*

- **User**: Compte authentifié avec email unique, mot de passe hashé et dates de
  suivi.
- **Category**: Sujet personnel appartenant à un utilisateur avec un nom et une
  liste de mots-clés.
- **CategoryKeyword**: Mot-clé ou synonyme rattaché à une catégorie.
- **ChannelResult**: Résultat calculé d'une recherche contenant les métadonnées
  nécessaires à l'affichage et à l'ouverture sur YouTube.
- **SearchExecution**: Trace légère d'une recherche pour suivre son état,
  l'erreur éventuelle et la date d'exécution.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Un nouvel utilisateur peut compléter le parcours
  "inscription -> connexion -> bibliothèque" en moins de 2 minutes.
- **SC-002**: 95% des recherches produisent soit des résultats, soit un message
  clair, en moins de 5 secondes côté expérience utilisateur.
- **SC-003**: 100% des résultats affichés respectent le tri décroissant par
  abonnés et les règles d'éligibilité récente.
- **SC-004**: Aucune perte de catégorie ou de données profil n'est observée lors
  d'une erreur temporaire de recherche.
