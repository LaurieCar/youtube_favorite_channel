# Feature: Recherche de chaînes YouTube par catégories

## Summary
Permettre à un utilisateur de créer un compte, se connecter, gérer une bibliothèque personnelle de catégories (sujets), puis rechercher et afficher les 5 chaînes YouTube les plus populaires pour une catégorie donnée. Chaque résultat permet d'ouvrir directement la chaîne sur YouTube via un lien. La "popularité" est définie par le nombre d'abonnés, sous réserve d'activité et de performance récente.

## Problem / Motivation
Trouver rapidement des chaînes YouTube pertinentes et reconnues sur un sujet précis est difficile : les résultats sont nombreux, parfois peu fiables, et l'utilisateur doit souvent refaire les mêmes recherches. Une bibliothèque de catégories permet de retrouver ses sujets favoris et relancer des recherches consistantes.

## Goals
- Authentifier les utilisateurs via email + mot de passe.
- Permettre la gestion (création, modification, suppression) de catégories personnalisées.
- Rechercher des chaînes liées à une catégorie via des mots-clés (et variantes/synonymes fournis).
- Retourner un Top 5 de chaînes selon une définition claire de "popularité".
- Permettre l'ouverture de la chaîne sur YouTube via un lien direct.
- Fournir une base fonctionnelle et extensible pour futures features (favoris, notifications).

## Non-Goals (Out of Scope)
- Lecture de vidéos dans l'application (pas d'intégration vidéo : redirection vers YouTube).
- Recommandations personnalisées basées sur comportement utilisateur (V1).
- Gestion multi-organisation / rôles complexes (V1).
- Notifications email de nouvelles vidéos (prévue plus tard).
- Gestion avancée de langue/pays/filtrage géographique (V1).

## Users & Roles
- **Utilisateur** : s'inscrit, se connecte, gère ses catégories, effectue des recherches, consulte les résultats, ouvre les liens YouTube.

## Key Concepts & Definitions
- **Catégorie** : sujet défini librement par l'utilisateur (ex: "Cybersécurité", "Cuisine", "Gaming") utilisé pour effectuer une recherche.
- **Mots-clés** : texte associé à une catégorie. La recherche se fait par correspondance sur :
  - le nom de la chaîne, ou
  - les titres de vidéos de la chaîne (avec un seuil minimal).
- **Synonymes / variantes** : mots alternatifs utilisés pour la recherche. En V1, ils sont fournis avec la catégorie (ex: liste de termes saisis ou associés).
- **Chaînes candidates** : chaînes identifiées comme correspondant aux mots-clés/synonymes.
- **Chaînes éligibles** : chaînes candidates qui respectent les critères d'activité et de performance récente.
- **Popularité (classement)** :
  - Classement principal : **nombre d'abonnés décroissant**.
  - Critères d'éligibilité :
    1. La chaîne a publié **au moins 1 vidéo** dans les **3 derniers mois**.
    2. Au moins **1 vidéo publiée dans ces 3 derniers mois** a dépassé **10 000 vues**.

## Assumptions
- La catégorie est librement créée par l'utilisateur.
- Les recherches se font sans filtre explicite de pays/langue en V1.
- Si moins de 5 chaînes éligibles existent, l'application affiche moins de résultats sans erreur.
- La correspondance sur les titres de vidéos se fait sur un nombre borné de vidéos récentes (ex: un lot "récent"), afin de garantir des temps de réponse raisonnables et une expérience stable.

## User Scenarios & Acceptance Tests

### Scenario 1: Création de compte
**Given** un visiteur n'est pas connecté  
**When** il crée un compte avec un email valide et un mot de passe conforme  
**Then** le compte est créé et l'utilisateur peut se connecter

**And** si l'email est déjà utilisé  
**Then** l'utilisateur voit un message clair indiquant que l'email est déjà enregistré

### Scenario 2: Connexion
**Given** un utilisateur a un compte  
**When** il saisit les bons identifiants  
**Then** il accède à l'application et à sa bibliothèque de catégories

**When** il saisit de mauvais identifiants  
**Then** un message indique l'échec sans révéler si l'email existe

### Scenario 3: Règles de mot de passe
**Given** un utilisateur crée ou change son mot de passe  
**When** le mot de passe ne respecte pas les règles minimales  
**Then** l'application refuse et affiche les règles attendues

Règles minimales :
- au moins 8 caractères
- au moins 1 majuscule
- au moins 1 chiffre

### Scenario 4: Page profil (mise à jour)
**Given** un utilisateur est connecté  
**When** il accède à sa page profil  
**Then** il peut modifier au minimum :
- son email
- son mot de passe (avec confirmation)

### Scenario 5: Créer une catégorie
**Given** un utilisateur est connecté  
**When** il crée une catégorie avec un nom valide et une liste de mots-clés/synonymes  
**Then** la catégorie apparaît dans sa bibliothèque

**And** si une catégorie du même nom existe déjà  
**Then** la création est refusée avec un message sur le doublon

### Scenario 6: Modifier / supprimer une catégorie
**Given** un utilisateur est connecté et possède une catégorie  
**When** il renomme la catégorie ou modifie ses mots-clés/synonymes  
**Then** les changements sont visibles immédiatement dans la bibliothèque

**When** il supprime une catégorie et confirme  
**Then** la catégorie disparaît de la bibliothèque

### Scenario 7: Lancer une recherche "Top 5" par catégorie
**Given** un utilisateur est connecté et possède une catégorie  
**When** il lance la recherche associée  
**Then** l'application affiche jusqu'à 5 chaînes éligibles, triées par abonnés décroissants  
**And** chaque résultat affiche au minimum :
- nom de la chaîne
- nombre d'abonnés (ou équivalent lisible)
- un indicateur d'éligibilité récente (ex: "activité récente confirmée")
- lien "Ouvrir sur YouTube"

### Scenario 8: Correspondance par mots-clés
**Given** une catégorie avec des mots-clés/synonymes  
**When** une chaîne correspond via le nom de chaîne  
**Then** elle est considérée comme candidate

**When** une chaîne ne correspond pas via le nom  
**Then** elle peut être candidate si au moins 5 titres de vidéos contiennent au moins un mot-clé/synonyme

### Scenario 9: Aucun résultat / peu de résultats
**Given** une recherche est lancée  
**When** aucune chaîne éligible n'est trouvée  
**Then** l'application affiche "Aucune chaîne trouvée" et propose de modifier les mots-clés

**When** moins de 5 chaînes éligibles existent  
**Then** l'application affiche les résultats disponibles sans erreur

### Scenario 10: Erreur temporaire de récupération
**Given** l'utilisateur lance une recherche  
**When** la récupération des données échoue temporairement  
**Then** l'application affiche un message clair et un bouton "Réessayer"  
**And** l'utilisateur conserve l'accès à ses catégories et à son profil

## Functional Requirements
1. Le système doit permettre la création de compte avec email obligatoire et mot de passe conforme.
2. Le système doit permettre la connexion via email + mot de passe.
3. Le système doit fournir une page profil permettant au minimum :
   - modification de l'email
   - modification du mot de passe
4. Le système doit refuser un email déjà utilisé lors de l'inscription.
5. Le système doit appliquer les règles minimales de mot de passe (8 caractères, 1 majuscule, 1 chiffre).
6. Le système doit permettre de créer une catégorie avec :
   - un nom
   - une liste de mots-clés/synonymes/variantes
7. Le système doit empêcher les doublons de catégories (même nom) pour un même utilisateur.
8. Le système doit permettre de modifier une catégorie (nom et mots-clés/synonymes).
9. Le système doit permettre de supprimer une catégorie avec confirmation.
10. Le système doit permettre de lancer une recherche à partir d'une catégorie.
11. Le système doit sélectionner des chaînes candidates via :
   - correspondance sur le nom de chaîne, ou
   - présence de mots-clés/synonymes dans au moins 5 titres de vidéos de la chaîne
12. Le système doit filtrer les chaînes éligibles selon :
   - au moins 1 vidéo publiée dans les 3 derniers mois
   - au moins 1 vidéo (dans ces 3 derniers mois) > 10 000 vues
13. Le système doit classer les chaînes éligibles par nombre d'abonnés décroissant.
14. Le système doit afficher jusqu'à 5 chaînes et permettre l'ouverture de chacune sur YouTube via un lien direct.
15. Le système doit gérer les cas "0 résultat" et "< 5 résultats" sans erreur.
16. Le système doit gérer les erreurs temporaires de récupération avec un message + option de réessai.

## Data / Entities
- **User**
  - id
  - email
  - password (stocké de façon sécurisée)
  - created_at, updated_at
- **Profile**
  - user_id
  - champs de profil modifiables (au minimum email)
- **Category**
  - id
  - user_id
  - name
  - keywords (liste)
  - synonyms/variants (liste ou inclus dans keywords)
  - created_at, updated_at
- **ChannelResult** (résultat de recherche, pas forcément stocké en V1)
  - channel_id
  - title
  - url
  - subscriber_count
  - eligibility_flags (activité récente, vidéo > 10k)
  - fetched_at

## Edge Cases & Constraints
- Catégories très courtes ("IA") → résultats trop larges : l'utilisateur doit pouvoir affiner via mots-clés/synonymes.
- Catégories avec accents et caractères spéciaux : doivent être acceptées et recherchables.
- Données manquantes ou inconsistantes pour certaines chaînes : elles doivent être exclues du Top 5 si l'éligibilité ne peut pas être vérifiée.
- La recherche doit rester utilisable même si la récupération est partiellement dégradée (messages clairs, réessai possible).
- Les résultats peuvent varier dans le temps : la recherche reflète l'état au moment de l'exécution.

## Non-Functional Requirements
- **Extensibilité** : le système doit permettre d'ajouter ultérieurement sans refonte majeure :
  - favoris de chaînes
  - favoris de catégories
  - suivi de favoris et notifications email (nouvelle vidéo sur un sujet suivi)
- **Performance (côté expérience utilisateur)** :
  - 95% des recherches doivent produire un résultat (ou un message d'absence de résultat) en moins de 5 secondes.
- **Fiabilité** :
  - l'application ne doit pas perdre les catégories/profil en cas d'erreur temporaire de recherche.

## Success Criteria
- Un utilisateur peut réaliser le parcours "Créer compte → Créer catégorie → Rechercher → Ouvrir chaîne" sans aide.
- 95% des recherches aboutissent à un affichage (résultats ou message) en moins de 5 secondes.
- Le Top 5 est cohérent : tri par abonnés, avec vérification d'activité et de performance récente.
- Les utilisateurs peuvent modifier email et mot de passe depuis leur profil sans erreur.
- La base fonctionnelle permet l'ajout futur de favoris et notifications sans remettre en cause les règles existantes.
