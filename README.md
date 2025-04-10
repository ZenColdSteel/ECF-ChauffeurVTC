# ECF

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/) [![pnpm](https://img.shields.io/badge/pnpm-7.x-blue.svg)](https://pnpm.io/) [![ESLint](https://img.shields.io/badge/ESLint-8.x-orange.svg)](https://eslint.org/) [![Prettier](https://img.shields.io/badge/Prettier-2.x-yellow.svg)](https://prettier.io/)

>projet ECF back-end de validation fin du ccp2 
sujet : systeme pour gerer des chauffeurs vtc assigné a des véhicules specifique 

---

## Table des matières

- [Getting Started](#getting-started)
- [Tech Stack](#tech-stack)
- [Directory Structure](#directory-structure)
- [Scripts](#scripts)
- [Contributions](#contributions)

---

## Getting Started

Pour démarrer ce projet en local :

1. **Clonez le dépôt**

   ```bash
   git clone https://github.com/ZenColdSteel/ECF-ChauffeurVTC
   cd ECF
   cd back-end
   ```

2. **Installez les dépendances**  
   Nous utilisons pnpm :

   ```bash
   pnpm install
   ```

3. **Configuration**  
   Créez un fichier `.env` à la racine et configurez les variables d'environnement.

4. **Lancer le projet**  
   Pour démarrer en mode développement :
   ```bash
   pnpm run dev
   ```

---

## Directory Structure

┣━━ [src](./src) # Configuration globale (variables d'environnement, DB, etc.)<br>
┃&emsp;&emsp;┣━━ [controllers/](./src/controllers) # Logique des endpoints (recevoir les requêtes, répondre)<br>
┃&emsp;&emsp;┣━━ [errors/](./src/errors) # Gestion des erreurs (classes d'erreur personnalisées, handlers)<br>
┃&emsp;&emsp;┣━━ [middlewares/](./src/middlewares) # Middlewares (authentification, gestion des erreurs, etc.)<br>
┃&emsp;&emsp;┣━━ [repositories/](./src/repositories) # Accès aux données (requêtes SQL ou utilisation d'un ORM)<br>
┃&emsp;&emsp;┣━━ [routes/](./src/routes) # Définition des routes de l'API<br>
┃&emsp;&emsp;┣━━ [scripts/](./src/scripts) # script de seed de la base de donneé avec des donnés factice<br>
┃&emsp;&emsp;┣━━ [services/](./src/services) # Logique métier (business logic)<br>
┃&emsp;&emsp;┣━━ [utils/](./src/utils) # Fonctions utilitaires et helpers<br>
┃&emsp;&emsp;┣━━ [validations/](./src/validations) # Schémas de validation et fonctions de validation<br>
┃&emsp;&emsp;┣━━ [app.js](./src/app.js) # Configuration principale de l'application et point d entree du serveur (initialisation, middlewares, routes)<br>
┣━━ [tests/](./tests) # Tests unitaires et d'intégration<br>
┣━━ [package.json](./package.json)<br>
┣━━ [.env](./.env) # Variables d'environnement (non versionné)<br>
┣━━ [.gitignore](./.gitignore)<br>
┗━━ [README.md](./README.md)

## Tech Stack

Ce projet utilise les technologies suivantes :

- **Node.js** – Environnement d'exécution JavaScript côté serveur
- **pnpm** – Gestionnaire de dépendances rapide et efficace
- **ES Modules** – Syntaxe moderne d'import/export (activée dans le package.json)
- **ESLint & Prettier** – Pour la qualité et le formatage du code
- **Husky, lint-staged, commitlint, commitizen** – Pour un workflow Git et des commits standardisés

---

## Scripts

Voici quelques scripts définis dans le fichier `package.json` :

- **`pnpm run dev`**
  Lance le serveur en mode développement..

- **`pnpm commit`**
  Utilise Commitizen pour formuler des messages de commit standardisés.

_N'hésitez pas à consulter le package.json pour la liste complète des scripts._

---

## Contributions

Les contributions sont les bienvenues ! Pour contribuer :

1. **Forkez le dépôt** et créez une branche dédiée pour votre fonctionnalité :

   ```bash
   git checkout -b feature/nom-fonctionnalité dev
   ```

2. **Respectez le workflow GitFlow** :

   - **dev** : branche d'intégration.
   - **feature/** : branche pour chaque nouvelle fonctionnalité.
   - **release/** et **hotfix/** seront créées en fonction des besoins.

3. **Utilisez Commitizen** pour vos commits :  
   Lancez `pnpm commit` ou `npx cz` afin de créer des messages de commit conformes aux [Conventional Commits](https://www.conventionalcommits.org/).

4. **Respectez les conventions de code**
   - Utilisez ESLint et Prettier pour garantir un code propre et bien formaté.
   - Vérifiez que vos commits passent la validation avec commitlint.
5. **Documentation des Requêtes Prisma et leurs Équivalents SQL**
Prisma :
   javascriptprisma.assignation.findUniqueOrThrow({
      where: { assignation_id: Number(id) },
   })
   SQL :
   sqlSELECT * FROM Assignation 
   WHERE assignation_id = <id>;
   getAssignationByCarId
   Prisma :
   javascriptprisma.assignation.findMany({
      where: { vehicule_id: id },
   })
   SQL :
   sqlSELECT * FROM Assignation 
   WHERE vehicule_id = <id>;
   getAssignationByDriverId
   Prisma :
   javascriptprisma.assignation.findMany({
      where: { chauffeur_id: id },
      include: { vehicule: true },
   })
   SQL :
   sqlSELECT a.*, v.* 
   FROM Assignation a
   JOIN Vehicule v ON a.vehicule_id = v.vehicule_id
   WHERE a.chauffeur_id = <id>;
   createAssignation
   Prisma :
   javascriptprisma.assignation.create({
      data: data,
   })
   SQL :
   sqlINSERT INTO Assignation (chauffeur_id, vehicule_id, date_debut, date_fin, ...) 
   VALUES (<data.chauffeur_id>, <data.vehicule_id>, <data.date_debut>, <data.date_fin>, ...);
   deleteAssignation
   Prisma :
   javascriptprisma.assignation.delete({
      where: { assignation_id: Number(id) },
   })
   SQL :
   sqlDELETE FROM Assignation 
   WHERE assignation_id = <id>;
   getAssignations
   Prisma :
   javascriptprisma.assignation.findMany()
   SQL :
   sqlSELECT * FROM Assignation;