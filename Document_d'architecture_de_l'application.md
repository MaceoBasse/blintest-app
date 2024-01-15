# Document d'architecture de l'application BlindTest

## Partie fonctionnelle

### Description générale

L'application BlindTest est une application de jeu de musique qui permet aux utilisateurs de tester leurs connaissances musicales. Les utilisateurs écoutent un extrait de musique et doivent deviner le titre et l'auteur de la musique.

### Fonctionnalités

- En tant qu'utilisateur, je veux pouvoir démarrer un nouveau jeu de blindtest afin de tester mes connaissances musicales.
- En tant qu'utilisateur, je veux écouter un extrait de musique pour pouvoir deviner le titre et l'auteur.
- En tant qu'utilisateur, je veux entrer le titre et l'auteur de la musique que j'ai devinée pour pouvoir soumettre ma réponse.
- En tant qu'utilisateur, je veux voir mon score final à la fin du jeu pour savoir combien de réponses j'ai correctement devinées.
- En tant qu'utilisateur, je veux pouvoir rejouer au jeu pour améliorer mon score.

## Partie technique

### Composants

- `App.js` : Composant racine de l'application.
- `Home.js` : Page d'accueil où l'utilisateur peut commencer le jeu.
- [`BlindTest.js`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) : Composant principal du jeu où l'utilisateur écoute la musique et saisit ses réponses.
- [`Results.js`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) : Page de résultats où le score final de l'utilisateur est affiché.

### Interfaces entre les composants

- `App.js` utilise le routage pour naviguer entre `Home.js`, [`BlindTest.js`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) et [`Results.js`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html).
- [`BlindTest.js`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) envoie les réponses de l'utilisateur à [`Results.js`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) via l'état de l'historique.

### Interfaces avec le back

L'application est actuellement une application front-end uniquement et n'a pas d'interface avec un back-end.

### Arborescence des composants

App

├── Home

├── BlindTest

└── Results

### Composants à forte valeur ajoutée

- [`BlindTest.js`](vscode-file://vscode-app/Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html) : Ce composant gère la logique principale du jeu. Il utilise l'API Web Audio pour jouer les extraits de musique, et l'état React pour gérer les réponses de l'utilisateur et le score.

### Justification des choix techniques

React a été choisi pour sa facilité d'utilisation et sa flexibilité pour créer des interfaces utilisateur interactives. L'API Web Audio a été utilisée pour la lecture des extraits de musique en raison de sa prise en charge intégrée dans les navigateurs modernes et de sa capacité à gérer des fichiers audio complexes.

