# Manual Build Instructions

If GitHub Actions is not working, you can build manually:

## Option 1: Build locally and push dist folder

```bash
# Install dependencies
npm install

# Build
npm run build

# The dist/ folder now contains the static site
# You can copy its contents to your gh-pages branch
```

## Option 2: Use GitHub Actions (Recommended)

1. Go to Settings → Pages → Source
2. Select "GitHub Actions"
3. Push to main branch
4. The workflow will build and deploy automatically

## Troubleshooting

If page is blank:
1. Check browser console (F12) for errors
2. Verify images exist in src/assets/imirly/
3. Check that vite.config.ts has correct base path
4. Ensure index.html has correct script src path
