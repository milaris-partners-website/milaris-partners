# Mémoire partagée du site

Mémoire commune à tous les associés et à leurs sessions Claude. Elle est lue automatiquement à chaque session (importée par `CLAUDE.md`).

On y consigne ce qui doit survivre à une session : préférences exprimées, décisions éditoriales ou graphiques, choix écartés et pourquoi, pièges techniques. Pas le détail des modifications (l'historique Git et les Pull Requests le conservent).

Format : une ligne par enseignement, ajoutée **en fin de fichier**, jamais au milieu. Le fichier est fusionné en mode « union » : deux ajouts simultanés sont conservés tous les deux.

`AAAA-MM-JJ | auteur | thème | enseignement`

---

2026-10-08 | Paul | rédaction | Registre d'un MD de grande banque d'affaires (Rothschild, Lazard) : précis, sobre, court.
2026-10-08 | Paul | rédaction | Aucun tiret dans les textes rédigés, ni tiret long ni tiret court en incise.
2026-10-08 | Paul | contenu | Le site existe en FR, EN, IT, DE ; le français est la langue de référence, les trois autres en sont la traduction fidèle dans le même registre.
2026-10-08 | Paul | technique | Les textes sont dans `locales/fr.ts`, `en.ts`, `it.ts`, `de.ts` (découpés le 2026-10-08 pour limiter les conflits).
2026-10-08 | Paul | technique | Le site est un export statique : pas de serveur, pas de variables d'environnement côté serveur, images non optimisées par Next.js.
2026-10-08 | Paul | technique | `next.config.js` est le seul fichier de configuration Next.js actif.
2026-10-08 | Paul | technique | Dépôt migré de MilarisPartners/milaris-partners vers milaris-partners-website/milaris-partners (organisation détenue par les associés). L'ancien dépôt est archivé et ne publie plus rien.
2026-10-08 | Paul | technique | Le domaine milaris.partners est géré chez Namecheap ; HTTPS obligatoire activé sur GitHub Pages.
