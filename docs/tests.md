# Stratégie de Tests

## Objectif

Garantir que les parcours critiques du produit restent fonctionnels et cohérents
avec les règles métier définies dans les specs.

## Niveaux de Tests

### Tests Unitaires

Portent sur:
- validations Zod
- règles métier auth
- normalisation des catégories
- logique de filtrage et tri YouTube

### Tests d'Intégration

Portent sur:
- inscription et connexion
- CRUD catégorie
- recherche Top 5
- mise à jour profil
- contrôle d'accès aux données

### Tests End-to-End

Portent sur les parcours utilisateur:
- inscription puis connexion
- création et édition d'une catégorie
- lancement d'une recherche
- modification du profil

## Mapping avec les User Stories

- **US1**: auth et accès à la bibliothèque
- **US2**: création, modification, suppression de catégorie
- **US3**: recherche YouTube Top 5
- **US4**: mise à jour du profil

## Critères d'Acceptation Couverts

- mot de passe conforme
- email unique
- doublon de catégorie refusé
- zéro résultat géré proprement
- erreur temporaire avec réessai
- données utilisateur non exposées

## Outils

- Vitest pour les tests unitaires et d'intégration ciblés
- Playwright pour les tests de parcours

## Critère de Validation Projet

Avant une démo ou une livraison:
- build OK
- lint OK
- tests critiques US1 à US3 exécutés
