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
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

### Project Structure

```
journal-assistent/
├── src/                    # Source code
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # App entry point
│   └── assets/            # Static assets
├── public/                # Public assets
├── dist/                  # Build output (generated)
└── .github/workflows/     # GitHub Actions
```

## Deployment

### Automatic Deployment (Recommended)

This project is configured for automatic deployment to GitHub Pages using GitHub Actions. Simply push to the `main` branch and the app will be automatically deployed.

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy to GitHub Pages:
```bash
npm run deploy
```

### GitHub Pages Setup

1. Go to your repository settings on GitHub
2. Navigate to "Pages" in the sidebar
3. Set source to "GitHub Actions"
4. The app will be available at: `https://yourusername.github.io/journal-assistent/`

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
