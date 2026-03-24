# PRD - YouTube Favorite Channel

## 1. Vision Produit

Créer une application web permettant à un utilisateur de structurer ses sujets
de veille YouTube sous forme de catégories personnelles et de découvrir, pour
chaque catégorie, les 5 chaînes les plus populaires et pertinentes.

## 2. Problème à Résoudre

La recherche native YouTube produit souvent un grand volume de résultats peu
hiérarchisés. L'utilisateur doit filtrer manuellement, vérifier l'activité des
chaînes et mémoriser les bons sujets à réutiliser.

## 3. Objectifs SMART

- Permettre à un utilisateur de créer son compte et sa première catégorie en
  moins de 2 minutes.
- Obtenir un affichage de résultat ou un message utile en moins de 5 secondes
  dans 95% des recherches.
- Garantir qu'aucune donnée de profil ou de catégorie ne soit perdue lors d'une
  erreur temporaire de recherche.
- Afficher uniquement des chaînes triées par abonnés et répondant aux critères
  d'activité récente définis.

## 4. Périmètre V1

### Inclus

- inscription et connexion par email/mot de passe
- gestion du profil utilisateur
- CRUD de catégories
- recherche Top 5 par catégorie
- liens directs vers les chaînes YouTube

### Exclus

- lecture vidéo intégrée
- recommandations personnalisées
- notifications email
- favoris de chaînes
- filtres géographiques ou linguistiques avancés

## 5. Utilisateurs Cibles

- veilleur thématique
- étudiant curieux
- utilisateur souhaitant garder une bibliothèque privée de sujets

## 6. Règles Métier

- un email est unique dans le système
- un mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1 chiffre
- une catégorie appartient à un seul utilisateur
- un nom de catégorie est unique par utilisateur
- une chaîne est éligible seulement si:
  - elle a au moins une vidéo publiée dans les 3 derniers mois
  - au moins une de ces vidéos dépasse 10 000 vues
- le classement final est ordonné par abonnés décroissants

## 7. Exigences Fonctionnelles

- créer un compte
- se connecter
- gérer ses informations de profil
- créer, modifier et supprimer des catégories
- lancer une recherche depuis une catégorie
- afficher jusqu'à 5 résultats
- proposer un réessai en cas d'erreur temporaire

## 8. Exigences Non Fonctionnelles

- simplicité d'usage sans documentation
- 95% des recherches en moins de 5 secondes
- confidentialité des données utilisateur
- base extensible pour futures évolutions

## 9. Glossaire

- **Catégorie**: sujet personnalisé créé par l'utilisateur
- **Mot-clé**: terme utilisé pour rechercher des chaînes liées au sujet
- **Chaîne candidate**: chaîne détectée comme potentiellement pertinente
- **Chaîne éligible**: chaîne validée selon les règles d'activité et de vues
- **Top 5**: liste finale triée par abonnés décroissants

## 10. KPI de Succès

- temps moyen de création du premier compte et de la première catégorie
- taux de recherches aboutissant à un résultat ou un message utile
- absence de perte de données lors d'erreurs externes
- cohérence métier des résultats affichés
