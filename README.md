# Construction Project Management System

## Features

- Login with email and password.
- Guest, private, admin pages.
- Active session on page reload.
- Projects resources (dummy).

## Setup

Install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

Copy the `.env.example` file to `.env` and fill in the values.

```bash
cp .env.example .env
```

## Development Server

Development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

## Available user
```json
[
  {
    "name": "Admin",
    "email": "admin@email.com"
  }, 
  {
    "name": "User 1",
    "email": "user1@email.com"
  }, 
  {
    "name": "User 2",
    "email": "user2@email.com"
  }
]
```

Look at the [nuxt documentation](https://nuxt.com/) to learn more.
