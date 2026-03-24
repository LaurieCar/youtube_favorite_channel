# Quickstart - Recherche de chaînes YouTube par catégories

## Goal

Valider rapidement le parcours V1 une fois le scaffold applicatif mis en place.

## Planned Local Setup

1. Installer les dépendances du projet.
2. Créer un fichier `.env.local` avec la configuration d'authentification, la
   base Prisma et la clé YouTube côté serveur.
3. Initialiser la base locale et lancer l'application en développement.

## Manual Validation Scenarios

### Scenario A - Inscription et connexion

1. Ouvrir l'écran d'inscription.
2. Créer un compte avec un email valide et un mot de passe conforme.
3. Vérifier la redirection vers la bibliothèque ou l'écran de connexion.
4. Se connecter avec les mêmes identifiants.

### Scenario B - CRUD catégorie

1. Créer une catégorie `Cybersécurité`.
2. Ajouter plusieurs mots-clés et synonymes.
3. Modifier la catégorie.
4. Tenter de créer un doublon de nom et vérifier le message d'erreur.
5. Supprimer la catégorie avec confirmation.

### Scenario C - Recherche Top 5

1. Créer une catégorie avec des mots-clés réalistes.
2. Lancer la recherche.
3. Vérifier que le résultat contient au maximum 5 chaînes.
4. Vérifier l'affichage du nombre d'abonnés et du lien YouTube.
5. Vérifier le comportement en cas de zéro résultat.

### Scenario D - Mise à jour du profil

1. Ouvrir la page compte.
2. Modifier l'email avec une valeur valide.
3. Modifier le mot de passe avec confirmation.
4. Vérifier qu'un mot de passe non conforme est refusé.
