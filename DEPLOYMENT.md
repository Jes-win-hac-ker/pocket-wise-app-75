# PocketWise App Deployment Guide

This guide covers multiple deployment options for the PocketWise budget tracking application.

## Prerequisites

- Node.js 18+
- npm or yarn
- Git

## Build the Application

```bash
npm install
npm run build
```

The built files will be in the `dist` directory.

## Deployment Options

### 1. GitHub Pages (Free)

**Automatic deployment via GitHub Actions:**

1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Set source to "GitHub Actions"
4. The `.github/workflows/deploy.yml` file will handle automatic deployment

**Manual deployment:**

```bash
npm run build
# Deploy the dist folder to gh-pages branch
```

**Live URL:** `https://yourusername.github.io/pocket-wise-app-75`

### 2. Netlify (Free tier available)

**Method 1: Drag & Drop**
1. Build the app: `npm run build`
2. Go to [Netlify](https://netlify.com)
3. Drag the `dist` folder to deploy

**Method 2: Git Integration**
1. Connect your GitHub repository
2. Netlify will use the `netlify.toml` configuration
3. Automatic deployments on push

**Method 3: Netlify CLI**
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

### 3. Vercel (Free tier available)

**Method 1: Vercel CLI**
```bash
npm install -g vercel
npm run build
vercel --prod
```

**Method 2: Git Integration**
1. Connect your GitHub repository at [Vercel](https://vercel.com)
2. Vercel will use the `vercel.json` configuration
3. Automatic deployments on push

### 4. Firebase Hosting (Free tier available)

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

The `firebase.json` file is pre-configured for optimal performance.

### 5. AWS S3 + CloudFront

**Prerequisites:**
- AWS Account
- AWS CLI configured

```bash
# Build the app
npm run build

# Create S3 bucket
aws s3 mb s3://your-bucket-name

# Upload files
aws s3 sync dist/ s3://your-bucket-name --delete

# Enable static website hosting
aws s3 website s3://your-bucket-name --index-document index.html --error-document index.html
```

For production, set up CloudFront distribution for CDN and HTTPS.

### 6. Docker Deployment

**Build and run locally:**
```bash
# Development
docker-compose --profile dev up

# Production
docker-compose --profile prod up
```

**Deploy to cloud:**
```bash
# Build image
docker build -t pocket-wise-app .

# Tag for registry
docker tag pocket-wise-app your-registry/pocket-wise-app:latest

# Push to registry
docker push your-registry/pocket-wise-app:latest
```

### 7. Traditional Web Hosting

For shared hosting or VPS:

1. Build the app: `npm run build`
2. Upload the `dist` folder contents to your web server's public directory
3. Configure server to serve `index.html` for all routes (SPA routing)

**Apache (.htaccess):**
```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

**Nginx:**
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

## Environment Configuration

### Production Optimizations

The app includes several production optimizations:

- **Code splitting** via Vite
- **Asset optimization** (minification, compression)
- **Progressive Web App** features
- **Security headers** in deployment configs
- **Caching strategies** for static assets

### Environment Variables

Currently, the app doesn't require environment variables, but you can add them:

```bash
# .env.production
VITE_API_URL=https://api.yourbackend.com
VITE_ANALYTICS_ID=your-analytics-id
```

## Monitoring and Analytics

Consider adding:

- **Google Analytics** for user tracking
- **Sentry** for error monitoring
- **Lighthouse CI** for performance monitoring

## Security Considerations

All deployment configurations include:

- Content Security Policy headers
- XSS protection
- Frame options
- HTTPS enforcement (where applicable)

## Performance Tips

1. **Enable compression** (gzip/brotli) on your server
2. **Use CDN** for global distribution
3. **Monitor Core Web Vitals** with Lighthouse
4. **Implement caching strategies** for API calls (when backend is added)

## Troubleshooting

**Routing Issues:**
- Ensure server is configured for SPA routing
- Check that all routes redirect to `index.html`

**Build Issues:**
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Check Node.js version compatibility

**PWA Issues:**
- Verify `manifest.json` and `sw.js` are accessible
- Check browser developer tools for service worker errors

## Cost Comparison

| Platform | Free Tier | Paid Features |
|----------|-----------|---------------|
| GitHub Pages | ✅ Unlimited public repos | Private repos (with paid GitHub) |
| Netlify | ✅ 100GB bandwidth/month | More bandwidth, forms, functions |
| Vercel | ✅ 100GB bandwidth/month | Serverless functions, teams |
| Firebase | ✅ 10GB storage/month | More storage, custom domain |
| AWS S3+CloudFront | ❌ Pay-as-you-go | Full AWS ecosystem |

Choose based on your needs, budget, and technical requirements.