# Bcrypt Hash Generator & Verifier

[![Release](https://img.shields.io/github/v/release/nooblk-98/Bcrypt-Hash-Generator?label=release)](https://github.com/nooblk-98/Bcrypt-Hash-Generator/releases)
[![Build](https://img.shields.io/github/actions/workflow/status/nooblk-98/Bcrypt-Hash-Generator/release-and-publish.yml?label=build)](https://github.com/nooblk-98/Bcrypt-Hash-Generator/actions/workflows/release-and-publish.yml)
[![Container](https://img.shields.io/badge/ghcr.io-bcrypt--hash--generator-2496ED?logo=docker&logoColor=white)](https://github.com/nooblk-98/Bcrypt-Hash-Generator/pkgs/container/bcrypt-hash-generator)
[![License](https://img.shields.io/github/license/nooblk-98/Bcrypt-Hash-Generator)](./LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D20.9-339933?logo=node.js&logoColor=white)](https://nodejs.org)

Generate and verify bcrypt password hashes in the browser — with a tunable cost factor, live password strength feedback, and hash introspection. Nothing leaves the page.

Built with **Next.js 16** (App Router, React 19), **Tailwind CSS v4**, and **bcryptjs**.

> [!NOTE]
> All hashing and verification run client-side via `bcryptjs`. There is no API route, no database, and no telemetry — passwords are never transmitted anywhere, even when the app is self-hosted.

## Features

- **Hash generation** with a selectable cost factor from 4 to 15 (default 10)
- **Password verification** — compare any plain-text password against an existing bcrypt hash
- **Live strength meter** scoring length and character variety across five tiers, from Very Weak to Very Strong
- **Hash introspection** — parses the algorithm version, cost factor, salt, and digest out of a hash string
- **Local history** of the last 10 generated hashes, with per-entry copy and delete
- **Toast notifications** for every generate, verify, copy, and delete action
- **Accessible by default** — semantic landmarks, ARIA live regions, full keyboard navigation, and a native `<details>` FAQ that works without JavaScript
- **SEO ready** — Open Graph and Twitter metadata, plus generated `/sitemap.xml` and `/robots.txt`

## Quick start

Requires [Node.js](https://nodejs.org) 20.9 or later.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

| Script | Description |
|---|---|
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Produce a production build |
| `npm start` | Serve the production build |
| `npm run lint` | Lint with `eslint-config-next` core-web-vitals rules |

## Run with Docker

Pull the published multi-arch image (`linux/amd64` and `linux/arm64`):

```bash
docker run --rm -p 3000:3000 ghcr.io/nooblk-98/bcrypt-hash-generator:latest
```

Or build it locally:

```bash
docker build -t bcrypt-generator .
docker run --rm -p 3000:3000 bcrypt-generator
```

The [Dockerfile](./Dockerfile) is a three-stage build. Dependencies install from the lockfile in their own layer, the app compiles to a Next.js [standalone](https://nextjs.org/docs/app/api-reference/config/next-config-js/output) bundle, and the runtime stage ships only `server.js`, the static assets, and a pruned `node_modules` on Alpine as a non-root user.

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3000` | Port the server listens on |
| `HOSTNAME` | `0.0.0.0` | Bind address |
| `NODE_ENV` | `production` | Next.js runtime mode |

Pin the base image with `--build-arg NODE_VERSION=22-alpine` if you need a different Node release.

## How it works

The entire tool is four small modules in [src/utils/](src/utils/), each doing one job:

- [bcrypt.js](src/utils/bcrypt.js) — thin async wrappers over `bcrypt.genSalt`, `bcrypt.hash`, and `bcrypt.compare`
- [hashInfo.js](src/utils/hashInfo.js) — regex-parses the `$<version>$<rounds>$<22-char salt><31-char digest>` structure of a 60-character bcrypt hash
- [passwordStrength.js](src/utils/passwordStrength.js) — scores a password on length thresholds (8, 12, 16) plus uppercase, lowercase, digit, and symbol classes
- [storage.js](src/utils/storage.js) — `localStorage` helpers that keep history capped at 10 entries

> [!TIP]
> Cost factor 10 hashes in roughly 100 ms and is a reasonable default for web applications. Each increment doubles the work — pick the highest value your login latency budget tolerates.

> [!WARNING]
> Hash history is stored unencrypted in your browser's `localStorage` under the `bcrypt_history` key. Clear it before handing off a shared machine.

## Project structure

```
├── src/
│   ├── app/
│   │   ├── layout.js          # Root layout — metadata, Inter font, ToastProvider
│   │   ├── page.js            # Home page: hero, generator, verifier, history, FAQ
│   │   ├── globals.css        # Tailwind v4 import + custom animations
│   │   ├── sitemap.js         # Generates /sitemap.xml
│   │   └── robots.js          # Generates /robots.txt
│   ├── components/
│   │   ├── Header.js          # Sticky glassmorphism header
│   │   ├── Footer.js          # Footer with links
│   │   ├── Generator.js       # Hash generation card
│   │   ├── Verifier.js        # Password verification card
│   │   ├── StrengthMeter.js   # Live strength bar
│   │   ├── HashInfo.js        # Parsed hash metadata panel
│   │   ├── History.js         # localStorage hash history
│   │   ├── Toast.js           # Toast provider and useToast hook
│   │   └── FAQ.js             # Accordion FAQ (native details/summary)
│   └── utils/                 # bcrypt, hash parsing, strength, storage
├── .github/workflows/
│   └── release-and-publish.yml  # Tag, release, and push to GHCR
├── Dockerfile
└── next.config.mjs            # React Compiler + standalone output
```

Imports use the `@/*` alias mapped to `src/` (see [jsconfig.json](./jsconfig.json)).

## Deployment

Deploy to [Vercel](https://vercel.com) with zero configuration:

```bash
npx vercel
```

The standalone Docker image also runs unchanged on any container host — Render, Railway, Fly.io, Cloud Run, or your own Kubernetes cluster.

> [!IMPORTANT]
> The canonical URL is still the `https://bcrypt-generator.example.com` placeholder. Replace it in [src/app/layout.js](src/app/layout.js) (`alternates.canonical` and `openGraph.url`), [src/app/sitemap.js](src/app/sitemap.js), and [src/app/robots.js](src/app/robots.js) before going live, or search engines will index the wrong host.

## Releases

Publishing a GitHub release builds and pushes the image to GHCR, tagged `x.y.z`, `x.y`, `x`, and `latest`. Alternatively, dispatch the **Release and Publish** workflow with a `patch`, `minor`, or `major` bump: it derives the next semver tag from the existing tag list, creates the tag and release for you, then publishes the image. Prereleases are published without moving the `latest` tag.

## Tech stack

- **[Next.js 16](https://nextjs.org/)** — App Router, React 19, React Compiler enabled
- **[Tailwind CSS v4](https://tailwindcss.com/)** — configured through `@tailwindcss/postcss`
- **[bcryptjs](https://github.com/dcodeIO/bcrypt.js)** — pure JavaScript bcrypt, no native bindings, so it runs in the browser and cross-compiles for arm64 without extra tooling
- **[Inter](https://fonts.google.com/specimen/Inter)** — self-hosted via `next/font/google`
