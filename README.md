# BlackBox Mavericks Event Platform

A modern, responsive event management platform built with React, TypeScript, and Tailwind CSS. Features a stunning dark mode interface with gradient effects, glass morphism, and smooth animations.

## 🌟 Features

- **Dynamic Theme System**: Seamless dark/light mode switching with persistent user preferences
- **Modern UI Components**: Glass morphism effects, gradient animations, and neon glows
- **Responsive Design**: Mobile-first approach ensuring great UX across all devices
- **Event Management**: Comprehensive event dashboard with filtering and categorization
- **Performance Optimized**: Fast loading times with optimized animations and transitions

## 🚀 Tech Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS with custom configuration
- **Build Tool**: Vite
- **State Management**: React Context API
- **Icons**: Lucide Icons
- **Code Quality**: ESLint, TypeScript

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Theme Customization

The project uses a custom Tailwind CSS configuration with extended themes:

### Colors

- **Dark Theme Colors**: Custom slate-based dark mode palette
- **Accent Colors**: Blue, Purple, Magenta, and Cyan variations
- **Gradient System**: Custom gradients for primary actions and effects

### Animations

- `spin-slow`: 20s linear infinite rotation
- `pulse-slow`: 4s cubic-bezier pulse effect
- `float`: 6s ease-in-out floating animation
- `shine`: 8s linear shine effect

## 📁 Project Structure

```
src/
├── components/
│   ├── common/      # Reusable components (Button, etc.)
│   ├── events/      # Event-related components
│   ├── layout/      # Layout components (Header, Footer)
│   └── theme/       # Theme context and providers
├── data/           # Mock data and constants
├── types/          # TypeScript type definitions
└── App.tsx         # Main application component
```

## 🎯 Component Guidelines

### Button Component

The Button component supports multiple variants:
- `primary`: Gradient background with hover effects
- `secondary`: Solid background with hover state
- `outline`: Bordered style with hover effects
- `ghost`: Minimal style with hover feedback
- `danger`: Red background for destructive actions

### Theme Provider

The application uses a custom ThemeProvider that:
- Manages theme state (dark/light)
- Persists theme preference in localStorage
- Provides theme toggle functionality

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Tailwind CSS for the amazing utility-first CSS framework
- Vite for the blazing fast build tool
- React team for the awesome frontend library