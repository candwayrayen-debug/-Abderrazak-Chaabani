# Netlify

Ce site est un build Vite statique : rien à configurer côté serveur.

---

## Option A — Déploiement via l'interface (le plus simple)

1. Allez sur https://app.netlify.com
2. **Add new site** → **Deploy manually**
3. Glissez-déposez le dossier `dist/` généré par la commande :

```bash
npm install
npm run build
```

Le site est en ligne immédiatement sur une URL `*.netlify.app`.

> ⚠️ Cette méthode ne rebuild pas automatiquement : il faut regénérer `dist/` à chaque mise à jour.

---

## Option B — Déploiement via Git (recommandé)

1. Poussez le code sur GitHub / GitLab / Bitbucket
2. Sur Netlify : **Add new site** → **Import an existing project**
3. Sélectionnez le dépôt
4. Netlify lit automatiquement `netlify.toml` :

| Réglage | Valeur |
| --- | --- |
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node version | `20` |

5. **Deploy site**

Chaque `git push` déclenche un nouveau déploiement. Chaque Pull Request génère un aperçu unique (*Deploy Preview*).

---

## Option C — Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init      # première fois : lie le projet à un site Netlify
netlify deploy --build --prod
```

Pour un aperçu temporaire sans mise en production :

```bash
netlify deploy --build
```

---

## Fichiers de configuration

- `netlify.toml` — commandes de build, redirections SPA, en-têtes de sécurité et cache
- `.nvmrc` — version de Node utilisée par Netlify

## Domaine personnalisé

1. **Site configuration** → **Domain management** → **Add a domain**
2. Saisir le domaine (ex. `chaabani-adoul.tn`)
3. Suivre les instructions DNS :
   - **Apex** (`chaabani-adoul.tn`) → enregistrement `A` vers `75.2.60.5`
   - **Sous-domaine** (`www`) → `CNAME` vers `<site>.netlify.app`
4. Netlify provisionne automatiquement un certificat **HTTPS Let's Encrypt**

## Après déploiement

Remplacer les coordonnées de démonstration dans `src/lib/siteCopy.ts` :

- `common.phone` / `common.phoneRaw`
- `common.whatsapp` / `common.whatsappRaw`
- `common.email`
- `common.mapsUrl`
- Adresse du cabinet (`contact.address`)
- Horaires (`contact.hours`)

Puis pousser à nouveau : Netlify redéploie automatiquement.

## Remplacer la photo du cabinet

Déposer le fichier à `public/images/portrait.jpg` (mêmes proportions, idéalement portrait 4:5, ≥ 800 × 1000 px).
