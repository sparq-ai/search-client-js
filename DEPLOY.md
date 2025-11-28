# Deployment

This package is automatically published to npm on every push to the `main` branch via GitHub Actions.

## How to Deploy

1. Update the version in `package.json`
2. Push/merge your changes to `main`
3. GitHub Actions will automatically:
   - Run tests
   - Build the package
   - Publish to npm

## Required Setup

Add an `NPM_TOKEN` secret to your GitHub repository:
1. Create an access token at https://www.npmjs.com/settings/tokens
2. Go to your GitHub repo → Settings → Secrets and variables → Actions
3. Add a new secret named `NPM_TOKEN` with your npm token

## Manual Deployment (if needed)

```bash
npm run build
npm publish --access=public
```
