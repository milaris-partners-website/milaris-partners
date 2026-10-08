# Milaris Partners, site web

Site de Milaris Partners (milaris.partners). Next.js 15, TypeScript, Tailwind CSS 3, Framer Motion. Export statique publié sur GitHub Pages.

## Démarrage

```bash
npm ci
npm run dev
```

Le site tourne sur http://localhost:3000.

## Contenu

Tous les textes sont dans `locales/` : un fichier par langue (`fr.ts`, `en.ts`, `it.ts`, `de.ts`). Toute modification de structure doit être répercutée dans les quatre.

## Mise en ligne

1. Chaque modification se fait sur une branche dédiée et fait l'objet d'une Pull Request.
2. Le workflow `pr-check.yml` vérifie que le site compile.
3. La fusion sur `main` déclenche `deploy.yml`, qui publie le site sur GitHub Pages.

Les règles de travail détaillées, notamment pour Claude Code, sont dans `CLAUDE.md`.

© Milaris Partners. Tous droits réservés.
