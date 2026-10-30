# Umgungundlovu TVET Entrepreneur Websites

A mobile-first business website and content-management system (CMS) for small businesses. The public website reads business information from Firebase. Approved business owners sign in to a protected admin area to update their content and images.

**Live website:** [umgungundlovu-tvet-entrepreneur-web-rho.vercel.app](https://umgungundlovu-tvet-entrepreneur-web-rho.vercel.app/)

## What the application includes

### Public business website

- Business branding, logo, introductory headline, and image carousel.
- About, services, work gallery, and contact sections.
- Contact links for phone, email, WhatsApp, and maps.
- A floating WhatsApp contact button on small screens; it yields to the WhatsApp contact action in the contact section when that action is visible.
- Responsive layouts designed mobile-first.

### Protected business admin

- Email-and-password sign-in through Firebase Authentication.
- A dashboard and editors for business details, branding, about information, services, gallery images, contact information, and compliance details.
- Firebase Storage uploads for business images.
- Business profile lookup through Firestore before granting access to the admin area.

## Technology

| Area | Technology |
| --- | --- |
| Front end | React 19 and TypeScript |
| Build and development server | Vite |
| Routing | React Router |
| State management | Redux Toolkit |
| Authentication and data | Firebase Authentication and Cloud Firestore |
| Image storage | Firebase Cloud Storage |
| Styling | CSS Modules and shared CSS variables |
| Hosting | Vercel |

## Requirements

- Node.js and npm versions compatible with the project's Vite version.
- A Firebase project configured for a web application.
- A Vercel project for deployment, if hosting on Vercel.

## Run locally

### 1. Get the code and install dependencies

```sh
git clone https://github.com/dlozilab/umgungundlovu-tvet-entrepreneur-websites-2026.git
cd umgungundlovu-tvet-entrepreneur-websites-2026
npm install
```

### 2. Configure Firebase

In the Firebase console:

1. Create a Firebase project and register a web app.
2. Enable **Email/Password** under Authentication sign-in providers.
3. Create a Cloud Firestore database.
4. Create or enable a Cloud Storage bucket.
5. Prepare Firestore and Storage security rules before adding real business data or deploying.

Create a `.env.local` file in the project root. There is no checked-in `.env.local.example`; add the following variables and replace the values with the Firebase web app settings and the ID of the business document the site should load:

```dotenv
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_BUSINESS_ID=
```

`VITE_BUSINESS_ID` is the Firestore document ID under `businesses`. If it is omitted, the app attempts to load a business with ID `demo`.

Vite embeds `VITE_` variables in the browser bundle. Firebase web-app configuration is client-side configuration, not a place for service-account credentials or other server secrets. Never put a Firebase service-account key or private credential in this file or in a `VITE_` variable.

### 3. Prepare the Firestore data

The public website reads `businesses/{businessId}`, its `services` subcollection, and its `media` subcollection.

Create `businesses/{businessId}` with the fields below. Empty strings and `false` values are valid starting values; replace them with the business's approved information before launch.

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

Create up to three service documents in `businesses/{businessId}/services`, using document IDs `1`, `2`, and `3`. Each document has a numeric `position` (`1`, `2`, or `3`), plus `name`, `description`, and `imagePath` fields.

Media documents live in `businesses/{businessId}/media`. Each document has a `slot`, `label`, `imagePath`, and `alt` field. The initial site uses these slots:

- Hero carousel: `hero1`, `hero2`
- About portrait: `portrait`
- Default gallery categories: `galleryPremises1`, `galleryPremises2`, `galleryWork1`, `galleryWork2`, `galleryDelivery1`, `galleryDelivery2`

Gallery categories can also use project slots in the form `galleryProject<CategoryName><Number>` (for example, `galleryProjectConstruction1`). Hero media may also include `caption` and `subcaption`.

For `imagePath`, use a Firebase Storage object path or a publicly accessible image URL. Admin uploads are stored under `businesses/{businessId}/{area}/{name}.jpg`.

### 4. Create an admin profile

Create the business owner's account in Firebase Authentication using Email/Password. Then create `profiles/{uid}` in Firestore, where `{uid}` is the account's Firebase Authentication UID:

```json
{
  "businessId": "your-business-id",
  "displayName": "Business owner",
  "role": "owner"
}
```

The `businessId` must match the business document ID used in `VITE_BUSINESS_ID`. The app recognizes `owner` and `support` profile roles.

### 5. Set Firebase security rules

Security rules are part of the production setup and are not supplied by this repository. Configure and test Firestore and Storage rules in Firebase before launch. They should allow the public website to read the content it needs while restricting data changes and image uploads to authenticated, authorized admin users for the appropriate business. Do not deploy permissive test-mode rules.

### 6. Start the development server

```sh
npm run dev
```

Open the local URL printed by Vite. Public content is shown at `/`; the admin sign-in is at `/login`.

## Quality checks

Run these checks before deployment:

```sh
npm run lint
npm run build
```

The build command runs the TypeScript project build before producing the Vite production bundle in `dist/`.

## Deploy to Vercel

1. Import this repository into Vercel.
2. Add the seven variables listed above in the Vercel project's environment-variable settings. Add them to every environment where the app should run (for example, Production and Preview).
3. Confirm that `VITE_BUSINESS_ID` matches the Firestore business document for that deployment.
4. Deploy and verify the live site, admin sign-in, contact links, and image loading.

The root `vercel.json` rewrites application routes to `/index.html` so client-side routes continue to work on direct navigation. Keep this configuration when hosting the app on Vercel.

## Pre-launch checklist

- [ ] Production Firebase project and web app are selected.
- [ ] All seven Vercel environment variables are set for the intended deployment environments.
- [ ] Firestore business content, services, and media have been reviewed.
- [ ] Firebase Authentication contains only the intended admin accounts.
- [ ] Each admin account has the correct `profiles/{uid}` document and business ID.
- [ ] Firestore and Storage security rules have been reviewed and tested; test-mode rules are not in use.
- [ ] Branding, spelling, contact information, WhatsApp destination, and opening hours are correct.
- [ ] Hero, service, and gallery images load on mobile and desktop.
- [ ] `npm run lint` and `npm run build` complete successfully.
- [ ] The deployed public site and `/login` route work when opened directly.

## Project layout

```text
.
├── public/                 # Static public assets
├── src/
│   ├── admin/              # Admin-related components
│   ├── components/
│   │   ├── cms/            # CMS layout and shared CMS components
│   │   ├── public/         # Public business website sections
│   │   └── shared/         # Components shared across the app
│   ├── features/           # Redux feature slices
│   ├── hooks/              # Shared React hooks
│   ├── lib/                # Firebase client setup
│   ├── pages/              # Admin pages
│   ├── routes/             # Route guards
│   ├── store/              # Redux store, selectors, and slices
│   ├── styles/             # Global styles and design tokens
│   ├── types/              # Shared TypeScript types
│   ├── utils/              # Shared utilities
│   ├── App.tsx             # Application routes
│   └── main.tsx            # Application entry point
├── package.json
├── vercel.json             # SPA route rewrite for Vercel
└── vite.config.ts
```

## Contributing

Fork the repository, create a focused branch, and open a pull request with a clear summary. For feature or behavior changes, include the verification steps you ran.

## Credits

Built by Sinenhlanhla, developer of the whole solution: [github.com/SineMag](https://github.com/SineMag).
