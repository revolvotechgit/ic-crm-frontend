# CRM System

A modern CRM (Customer Relationship Management) system built with React, Material UI, and Tailwind CSS.

## Features

- User authentication and authorization
- Dashboard with key metrics
- Project management
- Invoice tracking
- Team collaboration
- Analytics and reporting
- Responsive design for mobile and desktop

## Tech Stack

- React 19
- Material UI 6
- Tailwind CSS 4
- React Router 7
- Axios for API calls
- Vite for build tooling

## Local Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open http://localhost:5173 in your browser

## Building for Production

To build the app for production, run:

```
npm run build
```

This will create a `dist` folder with the compiled assets.

## Deploying to Netlify

### Option 1: Deploy via Netlify UI

1. Create a Netlify account and log in
2. Click "New site from Git"
3. Connect to your Git provider and select your repository
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click "Deploy site"

### Option 2: Deploy via Netlify CLI

1. Install the Netlify CLI:
   ```
   npm install netlify-cli -g
   ```
2. Login to Netlify:
   ```
   netlify login
   ```
3. Initialize your site:
   ```
   netlify init
   ```
4. Deploy your site:
   ```
   netlify deploy --prod
   ```

## Environment Variables

For production builds, you might need to set the following environment variables in Netlify:

- `VITE_API_URL`: Your API URL

## Handling Client-Side Routing

This project includes a `_redirects` file in the `public` directory and a `netlify.toml` configuration file to handle client-side routing with React Router. This ensures that all routes are properly directed to `index.html`.
