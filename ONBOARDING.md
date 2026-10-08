# Modifier le site Milaris Partners avec Claude Code

Guide d'installation pour les associés. Durée : quinze minutes, une seule fois.

## Principe

Le site est publié automatiquement à chaque fusion sur la branche `main` du dépôt GitHub `milaris-partners-website/milaris-partners`. Personne ne modifie `main` directement : chaque demande donne lieu à une branche et à une Pull Request. Claude Code s'en charge seul, ce qui permet à plusieurs associés de travailler en même temps sans conflit.

## Installation

1. Accepter l'invitation à rejoindre l'organisation GitHub `milaris-partners-website` reçue par email (compte `matteo-milarispartners`), ou directement sur https://github.com/orgs/milaris-partners-website/invitation
2. Installer l'application Claude pour Mac (https://claude.ai/download) et se connecter avec son compte Milaris.
3. Ouvrir l'onglet **Code**, choisir un dossier de travail (par exemple `Documents/GitHub`) et coller la demande suivante :

> Installe Homebrew s'il est absent, puis `gh` et Node.js 20. Ensuite clone le dépôt milaris-partners-website/milaris-partners dans ce dossier et lance `npm ci`.

4. Se connecter à GitHub. Claude lancera la commande ci dessous et affichera un code à saisir sur https://github.com/login/device :

```bash
gh auth login --hostname github.com --git-protocol https --web --scopes workflow
```

5. Ouvrir ensuite le dossier `milaris-partners` dans l'onglet Code. Claude y lit automatiquement le fichier `CLAUDE.md`, qui contient toutes les règles de travail.

## Au quotidien

1. Ouvrir une nouvelle session sur le dossier `milaris-partners` pour chaque sujet (bouton **+** à côté du nom du projet).
2. Claude indique d'emblée ce que font les autres associés (travaux en cours, dernières mises en ligne). Il le surveille ensuite pendant toute la session et prévient en cas de recoupement.
3. Décrire la modification en français, simplement : « Remplace le sous titre du Hero par ce texte, et traduis le dans les trois autres langues ».
4. Claude crée une branche, la signale immédiatement aux autres par une Pull Request en brouillon, modifie, puis affiche le résultat dans le navigateur intégré. Rien n'est en ligne à ce stade.
5. Relire, puis demander à Claude de fusionner. Le site est en ligne deux à trois minutes plus tard.

Les préférences et décisions prises en session sont consignées dans `MEMOIRE.md`, mémoire commune lue par toutes les sessions de tous les associés.

## En cas de doute

1. Si un autre associé a fusionné entre temps, Claude récupère sa version et résout les éventuels conflits avant de fusionner.
2. Une fusion est toujours réversible : il suffit de demander à Claude d'annuler la dernière modification.
3. Le site ne peut pas être mis en ligne s'il ne compile pas : GitHub bloque la fusion.
