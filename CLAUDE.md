# Site Milaris Partners

Site vitrine de Milaris Partners, cabinet M&A pan européen. Next.js 15 en export statique, publié sur GitHub Pages (domaine milaris.partners). Plusieurs associés le modifient avec Claude Code, parfois en même temps : les règles ci dessous évitent les conflits et les mises en ligne cassées.

## Mise en production

Toute fusion sur `main` déclenche `.github/workflows/deploy.yml` et met le site en ligne en quelques minutes. `main` est protégée : aucun push direct, tout passe par une Pull Request dont le build doit passer (`.github/workflows/pr-check.yml`).

## Workflow obligatoire

1. Avant de commencer : `git fetch origin` puis partir de `origin/main` à jour.
2. Créer une branche courte et explicite par sujet : `contenu/hero-italien`, `design/footer-mobile`, `fix/lien-contact`.
3. Faire la modification, puis vérifier localement avec `npm run build` (doit passer sans erreur).
4. Commit en français, message court et factuel.
5. Avant d'ouvrir la PR, intégrer `origin/main` (`git fetch origin && git rebase origin/main`), résoudre les éventuels conflits en conservant les deux intentions, relancer le build.
6. Pousser la branche et ouvrir la PR avec `gh pr create`, titre clair, description de deux ou trois lignes : ce qui change, sur quelles pages, dans quelles langues.
7. Ne jamais fusionner la PR soi même sans accord explicite de l'utilisateur. Ne jamais pousser sur `main`, ne jamais utiliser `--force` sur `main`.
8. Une PR = un sujet. Garder les PR petites et les fusionner vite : c'est la meilleure protection contre les conflits.

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
