#!/bin/bash
# Informe Claude de ce que font les autres associés sur le site.
# Appelé au démarrage de chaque session (complet) et à chaque message (seulement si quelque chose a changé).
# Ne bloque jamais : en cas d'erreur ou hors ligne, il se tait.

MODE="${1:-session}"
INPUT=$(cat 2>/dev/null)
cd "$(git rev-parse --show-toplevel 2>/dev/null)" || exit 0
command -v gh >/dev/null 2>&1 || exit 0

COMMON=$(git rev-parse --git-common-dir 2>/dev/null) || exit 0
STATE_DIR="$COMMON/claude-collaboration"
mkdir -p "$STATE_DIR" 2>/dev/null
SESSION=$(printf '%s' "$INPUT" | /usr/bin/jq -r '.session_id // "inconnue"' 2>/dev/null || echo inconnue)

# En cours de session, on ne revérifie GitHub qu'une fois toutes les 3 minutes.
if [ "$MODE" = "prompt" ]; then
  CHECK="$STATE_DIR/$SESSION.check"
  if [ -f "$CHECK" ] && [ $(( $(date +%s) - $(stat -f %m "$CHECK" 2>/dev/null || echo 0) )) -lt 180 ]; then
    exit 0
  fi
  touch "$CHECK"
fi

timeout_cmd() { if command -v gtimeout >/dev/null; then gtimeout 15 "$@"; else "$@"; fi; }

timeout_cmd git fetch --quiet --prune origin 2>/dev/null
BRANCH=$(git branch --show-current)
ME=$(gh api user --jq .login 2>/dev/null)

PRS=$(timeout_cmd gh pr list --state open --limit 30 \
  --json number,title,author,headRefName,isDraft,updatedAt,files \
  --jq '.[] | "#\(.number) [\(if .isDraft then "en cours" else "prête" end)] \(.title) | par \(.author.login) | branche \(.headRefName) | maj \(.updatedAt[0:16]) | fichiers: \([.files[].path] | join(", "))"' 2>/dev/null)

MAIN_LOG=$(git log origin/main -8 --date=format:'%d/%m %H:%M' --format='%ad  %an  %s' 2>/dev/null)
BEHIND=$(git rev-list --count HEAD..origin/main 2>/dev/null || echo 0)

# Fichiers modifiés de mon côté (branche + non commité) et fichiers touchés par les PR des autres.
MINE=$( { git diff --name-only origin/main...HEAD 2>/dev/null; git diff --name-only HEAD 2>/dev/null; } | sort -u)
OTHERS=$(timeout_cmd gh pr list --state open --limit 30 --json headRefName,files \
  --jq ".[] | select(.headRefName != \"$BRANCH\") | .files[].path" 2>/dev/null | sort -u)
OVERLAP=$(comm -12 <(printf '%s\n' "$MINE") <(printf '%s\n' "$OTHERS") | grep -v '^$')

SIG=$(printf '%s|%s|%s' "$PRS" "$(git rev-parse origin/main 2>/dev/null)" "$OVERLAP" | shasum | cut -c1-16)
SIGFILE="$STATE_DIR/$SESSION.sig"
if [ "$MODE" = "prompt" ] && [ -f "$SIGFILE" ] && [ "$(cat "$SIGFILE")" = "$SIG" ]; then
  exit 0
fi
echo "$SIG" > "$SIGFILE"

[ "$MODE" = "prompt" ] && echo "=== MISE À JOUR : l'activité des autres associés a changé depuis le dernier point ===" \
                       || echo "=== ÉTAT DE LA COLLABORATION SUR LE SITE ==="
echo "Utilisateur GitHub de cette session : ${ME:-inconnu}. Branche actuelle : ${BRANCH:-détachée}."
[ "$BEHIND" -gt 0 ] 2>/dev/null && echo "Cette branche a $BEHIND commit(s) de retard sur main : se recaler (git rebase origin/main) avant de continuer."
echo
echo "Pull Requests ouvertes (travaux en cours de chacun) :"
echo "${PRS:-  aucune}"
echo
echo "Dernières modifications fusionnées sur main :"
echo "$MAIN_LOG"
if [ -n "$OVERLAP" ]; then
  echo
  echo "ALERTE CHEVAUCHEMENT : ces fichiers sont modifiés ici ET dans une PR d'un autre associé :"
  echo "$OVERLAP"
  echo "Prévenir l'utilisateur, regarder la PR concernée (gh pr diff <numéro>) et vérifier que les modifications ne portent pas sur les mêmes textes."
fi
echo
echo "Rappel : signaler à l'utilisateur tout sujet qui recoupe une PR ouverte avant de modifier quoi que ce soit."
exit 0
