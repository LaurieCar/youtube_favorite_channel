# Constitution - YouTube Favorite Channel

## Mission
Permettre aux utilisateurs de gérer une bibliothèque personnelle de catégories de sujets YouTube et découvrir rapidement les 5 chaînes YouTube les plus populaires et pertinentes pour chaque catégorie, avec des liens directs vers YouTube.

## Core Principles

### 1. Simplicité et Clarté
- L'application doit être intuitive : un utilisateur doit pouvoir parcourir le site sans documentation.
- Les messages d'erreur doivent être clairs et guider l'utilisateur vers une action corrective.
- Les résultats de recherche doivent afficher des informations essentielles sans surcharge.

### 2. Fiabilité et Stabilité
- Les catégories et profils de l'utilisateur ne doivent JAMAIS être perdus en cas d'erreur temporaire.
- La recherche doit gérer les cas limites (0 résultat, < 5 résultats) sans erreur.
- Les erreurs temporaires doivent proposer un bouton "Réessayer" plutôt que de bloquer l'utilisateur.

### 3. Performance et Réactivité
- 95% des recherches doivent aboutir à un résultat (ou un message) en moins de 5 secondes.
- L'interface doit rester réactive même en cas de latence réseau.

### 4. Respect des Données Utilisateur
- Les mots de passe doivent être stockés de façon sécurisée.
- Les catégories sont privées à l'utilisateur (V1).
- Aucune donnée utilisateur ne doit être révélée en cas d'erreur (ex: "email exists" sans confirmer).

## Fundamental Rules

### Authentification & Sécurité
1. Email + mot de passe sont obligatoires pour la création de compte.
2. Mots de passe : minimum 8 caractères, 1 majuscule, 1 chiffre.
3. Les emails doivent être uniques dans le système.
4. Les messages d'erreur de connexion ne doivent pas révéler si l'email existe.

### Gestion des Catégories
1. Une catégorie = (nom unique + liste de mots-clés/synonymes) par utilisateur.
2. Les doublons de noms sont refusés avec message clair.
3. Les catégories supportent accents et caractères spéciaux.
4. Chaque catégorie peut être modifiée et supprimée (avec confirmation pour la suppression).

### Critères de Recherche & Popularité
1. **Sélection des candidates** :
   - Correspondance sur le nom de la chaîne, OU
   - Présence de mots-clés/synonymes dans au moins 5 titres de vidéos récentes
2. **Éligibilité (filtrage)** :
   - Au moins 1 vidéo publiée dans les 3 derniers mois
   - Au moins 1 vidéo (dans ces 3 mois) > 10 000 vues
3. **Classement** : ordre décroissant par nombre d'abonnés
4. **Affichage** : jusqu'à 5 chaînes avec lien direct YouTube

### Données Manquantes & Edge Cases
1. Si une chaîne a des données manquantes/inconsistantes → exclure du Top 5
2. Moins de 5 chaînes éligibles → afficher les résultats disponibles sans erreur
3. Zéro résultat → afficher "Aucune chaîne trouvée" + suggestion de modifier les mots-clés

## Scope & Constraints

### V1 Scope
✅ Authentification (email + mot de passe)  
✅ Gestion de profil (email, mot de passe)  
✅ Gestion de catégories (CRUD)  
✅ Recherche Top 5 par catégorie  
✅ Liens vers chaînes YouTube  

### V1 Out of Scope
❌ Lecture/intégration vidéo dans l'app (redirection vers YouTube)  
❌ Recommandations personnalisées basées sur l'historique  
❌ Gestion multi-organisation / rôles complexes  
❌ Notifications email  
❌ Filtrage avancé géographique/langue  
❌ Favoris de chaînes ou catégories  

### Non-Functional Constraints
- **Performance** : 95% des recherches < 5 secondes
- **Extensibilité** : architecture permettant futur ajout de (favoris, notifications) sans refonte
- **Fiabilité** : aucune perte de données en cas d'erreur temporaire

## Decision Framework

### When in Doubt, Ask:
1. **Ça améliore l'expérience utilisateur ?** → Inclure
2. **Ça fait partie de V1 scope ?** → Étudier
3. **Ça complique le système sans apporter de valeur immédiate ?** → Repousser à V2
4. **Ça compromet la sécurité ou fiabilité ?** → Bloquer

### Feature Proposal Checklist
- Aligné avec la mission ?
- Faisable dans les contraintes de performance ?
- Compatible avec les principes de simplicité et fiabilité ?
- Extensible pour futures itérations ?

## Data Integrity Rules

1. Catégories liées à l'utilisateur → jamais supprimées par erreur
2. Profil utilisateur = toujours à jour après modification
3. Résultats de recherche = snapshot au moment de l'exécution (pas de cache non-versionné)
4. Données de chaînes = revalidées à chaque recherche (source de vérité = YouTube API)

## Communication Standards

### Error Messages
- Clairs et orientés utilisateur (pas de stack traces)
- Proposer une action corrective (réessayer, vérifier les données, etc.)
- Ne pas révéler d'infos sensibles (ex: "Invalid credentials", pas "Email not found")

### Success Feedback
- Confirmation des actions (catégorie créée, recherche lancée)
- Transparence sur les résultats (nombre de chaînes trouvées, critères d'éligibilité)

## Acceptance & Launch Criteria

✅ **Must Have (bloquant pour V1)**
- Authentification sécurisée (email + pwd)
- CRUD complet sur catégories
- Top 5 avec critères de popularité corrects
- Aucune perte de données en cas d'erreur
- 95% des recherches < 5 secondes

✅ **Should Have (fortement recommandé)**
- Gestion profil (email, mot de passe)
- Messages d'erreur clairs et réessai
- Support accents/caractères spéciaux

⚠️ **Nice to Have (V2)**
- Favoris de chaînes / catégories
- Notifications de nouvelles vidéos
- Recommandations personnalisées
