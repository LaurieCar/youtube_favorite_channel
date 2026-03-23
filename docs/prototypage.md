# Prototypage et Design UI

## Source des Maquettes

Les maquettes de l'application ont été produites avec Google Stitch, puis
intégrées dans le projet dans le dossier `assets/maquettes/`.

## Prototype de l'application

Le prototype de l'application a été généré afin de simuler le comportement
global du produit avant l'implémentation fonctionnelle complète.

## Méthode utilisée

Le prototype a été généré en utilisant AI Studio à partir :

- du fichier `spec.md`
- des maquettes réalisées avec Stitch

## Objectif

Simuler le comportement de l'application avant implémentation.

## Écrans Disponibles

- `connexion.html`
- `maquette3.html` pour la bibliothèque de catégories
- `maquette4.html` pour la gestion d'une catégorie
- `maquette5.html` pour les résultats Top 5
- `monCompte.html` pour le profil

## Rôle du Prototypage

- figer la structure visuelle attendue
- réduire l'ambiguïté avant l'implémentation
- servir de support à la traduction en composants React

## Parcours utilisateur simulé

### Connexion

L'utilisateur accède à une page de login avec email et mot de passe.

### Gestion des catégories

L'utilisateur peut :

- créer une catégorie
- modifier une catégorie
- supprimer une catégorie

### Recherche

L'utilisateur lance une recherche sur une catégorie.

Le système affiche :

- les 5 chaînes les plus populaires
- un lien vers chaque chaîne YouTube

### Profil

L'utilisateur peut modifier :

- son email
- son mot de passe

## Réinjection dans le Développement

Les maquettes ont servi de base pour:
- la hiérarchie visuelle des pages
- les libellés principaux
- l'organisation des actions utilisateur
- la cohérence des parcours

## Résultat du prototype IA

AI Studio a généré :

- une structure d'interface cohérente
- un flux utilisateur complet
- un code HTML simulant l'application

## Limites

- le prototype n'est pas connecté à une vraie API
- les données sont simulées
- le comportement n'est pas entièrement fonctionnel

## Conclusion

Le prototype valide la cohérence entre la spec, la maquette et le parcours
utilisateur.
