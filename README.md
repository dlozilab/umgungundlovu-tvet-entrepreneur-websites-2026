# Umgungundlovu TVET Entrepreneur Websites

A mobile-first website and content-management system for small businesses. Public business content is loaded from Firebase, and owners can manage their site through a protected admin area.

## Live demo

https://umgungundlovu-tvet-entrepreneur-web-rho.vercel.app/

## Features

- Public business pages with a hero carousel, about, services, gallery, and contact sections.
- Admin sign-in and protected pages for business details, branding, about, services, gallery, contact, and compliance.
- Firestore-backed business content and Firebase Storage image uploads.
- Click-to-contact links for phone, email, WhatsApp, and maps.
- Responsive layouts built mobile-first.

## Tech stack

| Area | Technology |
| --- | --- |
| UI | React 19, TypeScript |
| Build tooling | Vite |
| State management | Redux Toolkit |
| Routing | React Router |
| Backend services | Firebase Authentication, Cloud Firestore, and Cloud Storage |
| Styling | CSS Modules and shared CSS variables |

## Getting started

### Clone and install

```sh
git clone https://github.com/dlozilab/umgungundlovu-tvet-entrepreneur-websites-2026.git
cd umgungundlovu-tvet-entrepreneur-websites-2026
npm install
```

### Configure Firebase

1. Create a Firebase project and register a web app.
2. Create a Cloud Firestore database.
3. Enable Email/Password in Firebase Authentication.
4. Create a Firebase Storage bucket.
5. Copy `.env.local.example` to `.env.local`, then fill in the Firebase web app configuration and business ID:

```dotenv
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_BUSINESS_ID=
```

### Seed Firestore

Set `VITE_BUSINESS_ID` to the business document ID and create `businesses/{id}` with the business fields used by the site:

```json
{
  "name": "Example Business",
  "headline": "A short business headline",
  "description": "A short introduction to the business.",
  "brandColour": "#1f5c3d",
  "logoPath": "",
  "sharePath": "",
  "aboutStory": "The business story.",
  "phone": "",
  "whatsapp": "",
  "email": "",
  "address": "",
  "hours": "",
  "delivers": false,
  "walkins": false,
  "registeredName": "",
  "cipcNumber": "",
  "established": "",
  "bbeeLevel": "",
  "proudlySa": false,
  "published": true
}
```

Create three documents in `businesses/{id}/services`, with document IDs `1`, `2`, and `3`. Each document has `position` (`1`, `2`, or `3`), `name`, `description`, and `imagePath`.

Create these nine documents in `businesses/{id}/media`, using each slot name as both the document ID and the `slot` value: `hero1`, `hero2`, `portrait`, `galleryPremises1`, `galleryPremises2`, `galleryWork1`, `galleryWork2`, `galleryDelivery1`, and `galleryDelivery2`. Each document uses `slot`, `label`, `imagePath`, and `alt`; hero documents may also include `caption` and `subcaption`. Set `imagePath` to the Firebase Storage object path, or to a publicly accessible URL.

Create one Email/Password user in Firebase Authentication. Then create `profiles/{uid}` in Firestore with:

```json
{
  "businessId": "your-business-id",
  "displayName": "Business owner",
  "role": "owner"
}
```

Publish Firestore and Storage security rules for your project in the Firebase console.

### Run locally

```sh
npm run dev
```

## Deployment on Vercel

Import the repository into Vercel and add all seven environment variables separately in the project's Vercel settings. Environment variables in `.env.local` are not uploaded automatically.

The root `vercel.json` contains the SPA rewrite that routes client-side paths to `/index.html`. Keep it in the deployed project so routes such as `/admin` and `/login` work on direct navigation.

## Project structure

```text
.
├── public/
│   ├── flag-za.svg
│   ├── robots.txt
│   └── site-prototype (3).html
├── src/
│   ├── admin/
│   ├── components/
│   │   ├── cms/
│   │   ├── public/
│   │   └── shared/
│   ├── features/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   │   ├── admin/
│   │   ├── AdminLoginPage.module.css
│   │   └── AdminLoginPage.tsx
│   ├── routes/
│   ├── site/
│   ├── store/
│   │   └── slices/
│   ├── styles/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   └── store.ts
├── .env.local.example
├── .gitignore
├── eslint.config.js
├── flag-za.svg
├── index.html
├── package-lock.json
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json
└── vite.config.ts
```

## Contributing

Fork the repository, create a focused branch, and open a pull request with a clear summary of the change. For feature or behavior changes, include the verification steps you ran.

## Credits

Built by Sinenhlanhla, developer of the whole solution: https://github.com/SineMag
