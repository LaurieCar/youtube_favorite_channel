# Data Model - Recherche de chaînes YouTube par catégories

## User

**Purpose**: représenter un compte authentifié propriétaire de catégories.

**Fields**:
- `id`: identifiant unique
- `email`: chaîne unique, normalisée, non vide
- `passwordHash`: hash sécurisé du mot de passe
- `createdAt`: date de création
- `updatedAt`: date de dernière modification

**Validation Rules**:
- email unique dans le système
- email stocké sous forme normalisée
- mot de passe brut jamais persisté

## Category

**Purpose**: représenter un sujet YouTube personnel.

**Fields**:
- `id`: identifiant unique
- `userId`: référence vers `User`
- `name`: nom visible de la catégorie
- `normalizedName`: nom normalisé pour détection de doublon
- `createdAt`: date de création
- `updatedAt`: date de dernière modification

**Validation Rules**:
- unicité de `normalizedName` par `userId`
- le nom doit accepter accents et caractères spéciaux
- la suppression doit être confirmée côté UI

## CategoryKeyword

**Purpose**: stocker les mots-clés et synonymes associés à une catégorie.

**Fields**:
- `id`: identifiant unique
- `categoryId`: référence vers `Category`
- `value`: libellé du mot-clé
- `normalizedValue`: forme normalisée pour recherche
- `createdAt`: date de création

**Validation Rules**:
- au moins un mot-clé par catégorie
- suppression des doublons exacts dans une même catégorie

## SearchExecution

**Purpose**: tracer une exécution de recherche sans transformer le résultat
YouTube en donnée métier permanente.

**Fields**:
- `id`: identifiant unique
- `userId`: référence vers `User`
- `categoryId`: référence vers `Category`
- `status`: `pending | success | empty | error`
- `startedAt`: date de lancement
- `finishedAt`: date de fin
- `errorCode`: code métier ou technique optionnel

**Validation Rules**:
- une exécution ne modifie jamais les catégories ni le profil
- un état `error` doit garder la possibilité de relancer

## ChannelResult

**Purpose**: représenter un résultat calculé d'une recherche.

**Fields**:
- `channelId`: identifiant YouTube
- `title`: nom de la chaîne
- `url`: URL directe YouTube
- `subscriberCount`: nombre d'abonnés
- `recentActivityVerified`: booléen
- `recentHitVerified`: booléen
- `matchedBy`: `channel_name | video_titles`
- `fetchedAt`: date de récupération

**Validation Rules**:
- exclure tout résultat si les données nécessaires à l'éligibilité sont absentes
- trier par `subscriberCount` décroissant avant affichage
- limiter l'affichage final à 5 résultats

## Relationships

- `User 1 -> n Category`
- `Category 1 -> n CategoryKeyword`
- `User 1 -> n SearchExecution`
- `Category 1 -> n SearchExecution`

## State Transitions

### SearchExecution
- `pending -> success`
- `pending -> empty`
- `pending -> error`
- `error -> pending` lors d'un réessai utilisateur
