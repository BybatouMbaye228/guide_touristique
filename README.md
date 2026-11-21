# Répertoire des guides touristiques du Sénégal

Application front-end Angular de gestion d'un répertoire de guides touristiques.
Projet d'évaluation finale du cours Développement front-end (Licence 2 Ingénierie Informatique, Université Assane Seck de Ziguinchor).
Toutes les données sont fictives.

## Équipe
- Membre 1 : NOM Prénom (fondations, service, routes, documentation)
- Membre 2 : NOM Prénom (liste, recherche, filtres)
- Membre 3 : NOM Prénom (formulaire, validations, styles)

## Prérequis
- Node.js (version LTS) : https://nodejs.org
- npm (installé avec Node.js)
- Angular CLI : `npm install -g @angular/cli`

## Installation et lancement
```bash
git clone https://github.com/BybatouMbaye228/guide_touristique.git
cd guide_touristique
npm install
ng serve --open
```
L'application est ensuite disponible sur http://localhost:4200.
Pour vérifier la compilation : `ng build`.

## Fonctionnalités
- Liste des guides, recherche par nom, prénom ou spécialité, message si aucun résultat
- Filtres par région et par statut (Actif / Inactif)
- Note formatée avec un pipe, statut affiché par un badge
- Ajout, modification et suppression (avec confirmation) d'un guide
- Validation du formulaire (e-mail, téléphone, longueurs minimales) et messages de succès ou d'erreur
- Interface responsive, utilisable au clavier, champs associés à des labels

## Architecture
| Fichier / dossier | Rôle |
|---|---|
| `src/main.ts` | Point d'entrée : démarre l'application |
| `src/index.html` | Unique page HTML de l'application |
| `src/app/app.ts` | Composant racine : en-tête, menu et `<router-outlet />` |
| `src/app/app.routes.ts` | Table des routes (adresse vers composant) |
| `src/app/app.config.ts` | Configuration de l'application |
| `src/app/models/guide-touristique.ts` | Interface TypeScript `GuideTouristique` |
| `src/app/services/guide-touristique.service.ts` | Service injectable : données et opérations CRUD |
| `src/app/components/guide-list/` | Composant de liste, recherche et filtres |
| `src/app/components/guide-form/` | Composant de formulaire d'ajout et de modification |
| `src/app/components/not-found/` | Page « introuvable » |
| `angular.json` | Configuration de la compilation et du serveur |
| `package.json` | Dépendances et scripts (`npm start`, `npm run build`) |

Routes : `/guides`, `/guides/nouveau`, `/guides/:id/modifier`, `**` (page introuvable).

## Limites de la solution
- Les données sont en mémoire dans le service : elles sont perdues au rechargement de la page.
- Pas d'authentification : tout utilisateur peut ajouter, modifier ou supprimer.
- Pas de pagination : toute la liste s'affiche, ce qui devient lourd avec beaucoup de guides.
- Les validations sont uniquement côté client et ne remplacent pas une validation côté serveur.

## Évolution possible vers une API REST
Remplacer le tableau en mémoire du service par des appels `HttpClient` vers une API (`GET /api/guides`, `GET /api/guides/:id`, `POST /api/guides`, `PUT /api/guides/:id`, `DELETE /api/guides/:id`), en utilisant des `Observable`. Le serveur validerait les données et gérerait l'authentification. Les composants changeraient peu, puisqu'ils passent déjà par le service.

## Bibliothèques et ressources utilisées
- Angular et Angular CLI
- TypeScript
- RxJS (inclus avec Angular)
- Node.js et npm