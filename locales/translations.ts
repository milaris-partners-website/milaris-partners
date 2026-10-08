// Un fichier par langue pour limiter les conflits quand plusieurs personnes modifient les textes.
// Toute clé ajoutée dans une langue doit l'être dans les quatre.
import { fr } from './fr';
import { en } from './en';
import { it } from './it';
import { de } from './de';

export const translations = {
  FR: fr,
  EN: en,
  IT: it,
  DE: de,
};
