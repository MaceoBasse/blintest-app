# Blind Test

L'application BlindTest est une application de jeu de musique qui permet aux utilisateurs de tester leurs connaissances musicales. Les utilisateurs écoutent un extrait de musique et doivent deviner le titre et l'auteur de la musique.

## Installation

Installez les dépendances avec npm :

```sh
npm install
```

## Utilisation

Pour démarrer l'application en mode développement, exécutez :

```sh
npm start
```

Ouvrez [http://localhost:3000](http://localhost:3000) pour le voir dans le navigateur.

## Structure du projet

- `src/App.jsx` : Composant principal de l'application.
- `src/components/BlindTest.jsx` : Composant pour le test à l'aveugle.
- `src/components/Home.jsx` : Composant pour la page d'accueil.
- `src/components/Results.jsx` : Composant pour la page de résultats.
- `src/musicTracks.js` : Fichier contenant les pistes musicales.

## Tests

Pour exécuter les tests, utilisez :

```sh
npm test
```

## Construire le projet

Pour construire le projet pour la production, exécutez :

```sh
npm run build
```

## Licence

Ce projet est sous licence MIT.
