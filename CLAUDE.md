# Site Milaris Partners

Site vitrine de Milaris Partners, cabinet M&A pan européen. Next.js 15 en export statique, publié sur GitHub Pages (domaine milaris.partners). Plusieurs associés le modifient avec Claude Code, parfois en même temps : les règles ci dessous évitent les conflits et les mises en ligne cassées.

## Mise en production

Toute fusion sur `main` déclenche `.github/workflows/deploy.yml` et met le site en ligne en quelques minutes. `main` est protégée : aucun push direct, tout passe par une Pull Request dont le build doit passer (`.github/workflows/pr-check.yml`).

## Coordination entre associés

Un script (`.claude/hooks/etat-collaboration.sh`) injecte automatiquement l'état de la collaboration au démarrage de chaque session, puis à nouveau en cours de session dès que quelque chose change (vérification toutes les 3 minutes) : PR ouvertes avec leur auteur et les fichiers touchés, dernières fusions sur `main`, retard de la branche, chevauchements de fichiers.

1. **Au démarrage**, résumer en une ou deux phrases à l'utilisateur ce que font les autres associés (PR ouvertes) et ce qui a été fusionné récemment, s'il y a du nouveau.
2. **Avant toute modification**, comparer la demande avec les PR ouvertes. Si elle recoupe un travail en cours (même page, même section, mêmes textes), le dire avant d'agir et proposer : attendre la fusion, ou reprendre la branche existante en accord avec son auteur.
3. **Réserver le sujet tout de suite** : dès le premier commit, pousser la branche et ouvrir une PR en brouillon (`gh pr create --draft`) avec un titre explicite. C'est ce qui rend le travail visible pour les autres en temps réel. Pousser ensuite à chaque étape significative.
4. **En cas d'alerte chevauchement** ou de mise à jour signalée par le script, en informer l'utilisateur immédiatement, regarder la PR concernée (`gh pr diff <numéro>`) et se recaler si nécessaire.
5. **Avant une fusion**, relire la liste des PR ouvertes et les fusions récentes, se recaler sur `origin/main`, relancer le build.

## Workflow obligatoire

1. Avant de commencer : `git fetch origin` puis partir de `origin/main` à jour. Si `node_modules` est absent (nouvel espace de travail), lancer `npm ci`.
2. Créer une branche courte et explicite par sujet : `contenu/hero-italien`, `design/footer-mobile`, `fix/lien-contact`.
3. Faire la modification et la montrer : lancer l'aperçu local (configuration `site` de `.claude/launch.json`, ou `npm run dev`) et afficher la page concernée dans le navigateur intégré, dans la langue concernée.
4. Vérifier avec `npm run build` (doit passer sans erreur). Commit en français, message court et factuel.
5. Intégrer `origin/main` (`git fetch origin && git rebase origin/main`), résoudre les éventuels conflits en conservant les deux intentions, relancer le build.
6. Passer la PR de brouillon à prête (`gh pr ready`), avec une description de deux ou trois lignes : ce qui change, sur quelles pages, dans quelles langues.
7. Fusionner uniquement sur demande explicite de l'utilisateur (`gh pr merge --squash --delete-branch`), une fois la vérification du build au vert. Puis suivre le déploiement (`gh run watch`) et confirmer la mise en ligne. Ne jamais pousser sur `main`, ne jamais utiliser `--force` sur `main`.
8. Une PR = un sujet. Garder les PR petites et les fusionner vite : c'est la meilleure protection contre les conflits.

## Mémoire partagée

@MEMOIRE.md

La mémoire du site est **commune** et versionnée : c'est `MEMOIRE.md`, pas la mémoire personnelle de Claude. Dès que l'utilisateur exprime une préférence durable, tranche une question éditoriale ou graphique, écarte une option, ou qu'un piège technique est rencontré, ajouter une ligne en fin de `MEMOIRE.md` dans la même PR. Ne rien consigner de confidentiel (le dépôt est public).

## Structure

1. `app/` : pages (accueil, `cession-entreprise`, `acquisition-entreprise`, `financement`, `equipe`, `transactions`, `carrieres`, pages légales).
2. `components/` : sections de page (Hero, Services, Transactions, Footer, etc.).
3. `locales/fr.ts`, `en.ts`, `it.ts`, `de.ts` : tous les textes du site, un fichier par langue. `locales/translations.ts` ne fait que les assembler.
4. `contexts/LanguageContext.tsx` : langue courante (FR par défaut) et fonction `t()`.
5. `public/` : images, logos, photos de l'équipe (`public/team`), `CNAME` du domaine (ne pas toucher).

## Règles sur les textes

1. Les quatre langues doivent rester alignées : toute clé ajoutée, renommée ou supprimée dans une langue l'est dans les quatre, à la même place.
2. Ne jamais mettre de texte en dur dans un composant : passer par les fichiers de `locales/`.
3. Registre : celui d'un MD de grande banque d'affaires (Rothschild, Lazard). Précis, sobre, court.
4. Aucun tiret dans les textes rédigés (ni tiret long, ni tiret court en incise).
5. Quand l'utilisateur fournit un texte en français, proposer les traductions EN, IT, DE dans le même registre et les soumettre dans la même PR.

## Commandes

```bash
npm ci            # installer les dépendances
npm run dev       # serveur local sur http://localhost:3000
npm run build     # build de production (export statique dans out/)
```
