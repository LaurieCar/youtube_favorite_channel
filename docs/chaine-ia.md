# Chaîne de Valeur IA du Projet

## Vue d'Ensemble

Le projet suit une chaîne de production inspirée du document de modélisation:

`cadrage -> constitution -> spécification -> maquettes -> plan -> tâches -> implémentation`

## 1. Cadrage Initial

- production d'un cadrage métier dans `docs/cadrage.md`
- définition des personas, pain points et objectifs V1

## 2. Constitution

- formalisation des règles non négociables dans `.specify/memory/constitution.md`
- cadrage du scope, de la sécurité et des critères de recherche

## 3. Spécification

- transformation du besoin en spec produit dans
  `specs/001-recherche-youtube-categories/spec.md`
- définition des user stories, critères d'acceptation et exigences

## 4. Design Visuel

- maquettes générées avec Google Stitch
- stockage des maquettes dans `assets/maquettes/`

## 5. Plan Technique

- choix de la stack et de la structure dans
  `specs/001-recherche-youtube-categories/plan.md`
- formalisation du modèle de données et des contrats API

## 6. Tâches

- découpage du backlog dans
  `specs/001-recherche-youtube-categories/tasks.md`

## 7. Implémentation

- génération du scaffold applicatif Next.js
- intégration de Prisma, Auth.js, validation Zod et service YouTube

## Valeur de cette Chaîne

- conserve une cohérence entre vision métier et code
- rend le projet explicable dans un cadre académique
- démontre l'utilisation structurée des outils IA dans le cycle de développement
