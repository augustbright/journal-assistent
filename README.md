# Journal Assistant PWA

A Progressive Web App (PWA) for journal management, built with React, TypeScript, and Vite. This app is designed to be deployed on GitHub Pages and provides a modern, responsive interface with offline capabilities.

## Features

- 📱 **Progressive Web App** - Installable on mobile and desktop
- ⚡ **Fast & Responsive** - Built with Vite for optimal performance
- 🌐 **Offline Support** - Works without internet connection
- 🎨 **Modern UI** - Clean, responsive design
- 📝 **TypeScript** - Type-safe development
- 🔧 **PWA Ready** - Service worker and manifest included

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/journal-assistent.git
cd journal-assistent
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (outputs to `docs/`)
- `npm run build:prod` - Build for production (alias)
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run clean` - Clean build directory

### Project Structure

```
journal-assistent/
├── src/                    # Source code
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # App entry point
│   └── assets/            # Static assets
├── public/                # Public assets
├── docs/                  # Build output (generated)
└── .github/workflows/     # GitHub Actions
```

## Deployment

### Local Build and Manual Deployment

This project is configured for local building and manual deployment to GitHub Pages.

1. Build the project locally:
```bash
npm run build
# or
./deploy.sh
```

2. The build files will be generated in the `docs/` directory

3. Deploy to GitHub Pages:
   - Push the `docs/` folder to your main branch
   - Or use GitHub's Pages settings to deploy from the main branch

### GitHub Pages Setup

1. Go to your repository settings on GitHub
2. Navigate to "Pages" in the sidebar
3. Set source to "Deploy from a branch"
4. Select the `main` branch and `/docs` folder
5. The app will be available at: `https://yourusername.github.io/journal-assistent/`

## PWA Features

### Installation

- **Desktop**: Click the install button in the browser address bar
- **Mobile**: Use "Add to Home Screen" from the browser menu
- **iOS**: Use "Add to Home Screen" from Safari's share menu

### Offline Support

The app includes a service worker that caches resources for offline use. Users can continue using the app even without an internet connection.

## Customization

### Updating App Information

Edit the PWA manifest in `vite.config.ts`:

```typescript
manifest: {
  name: 'Your App Name',
  short_name: 'App',
  description: 'Your app description',
  theme_color: '#your-color',
  // ... other options
}
```

### Adding Icons

1. Place your icon files in the `public/` directory
2. Update the manifest icons array in `vite.config.ts`
3. Run `npm run build` to generate PWA assets

## Technologies Used

- [React](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool
- [Vite PWA Plugin](https://vite-plugin-pwa.netlify.app/) - PWA support
- [Workbox](https://developers.google.com/web/tools/workbox) - Service worker

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
