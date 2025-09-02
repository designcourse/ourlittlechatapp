# LiveChat - Real-time Chat Application

## Overview

LiveChat is a modern real-time chat application built with Next.js and React. The project focuses on creating an intuitive and visually appealing chat interface that enables seamless communication between users and AI.

## Project Structure

```
livechat/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/
│   │   │       └── route.ts # OpenAI streaming API route
│   │   ├── globals.css      # Global styles and custom scrollbar
│   │   ├── layout.tsx       # Root layout component
│   │   └── page.tsx         # Main page component
│   └── components/
│       └── Chat.tsx         # Functional chat component (streaming)
├── public/
│   └── figma-assets/        # Design assets exported from Figma
├── package.json
└── README.md
```

## Technologies Used

### Frontend Framework
- **Next.js 15.5.2** - React framework with App Router
- **React 19.1.0** - UI library for building user interfaces
- **TypeScript** - Type-safe JavaScript development

### Styling
- **Tailwind CSS v4** - Utility-first CSS framework
- **Custom CSS** - Custom scrollbar styling and design system variables

### Development Tools
- **Turbopack** - Fast bundler for Next.js development
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
 
### AI
- **OpenAI SDK** - Official Node/JS client
- **Model** - `gpt-4o` for streamed chat completions

### Design Integration
- **Figma Integration** - Direct design-to-code workflow
- **SVG Assets** - Scalable vector graphics for icons
- **Design System** - Consistent color palette and spacing

## Features

### Current Implementation
- **Streaming AI Chat** - Real-time responses from OpenAI (`gpt-4o`) via SSE
- **Character-by-Character Rendering** - Partial tokens appear as they arrive
- **Message Flow** - Send with Enter, loading state, graceful error handling
- **Auto-Scroll** - Keeps the latest message in view
- **Pixel-Perfect UI** - Preserves original design, bubbles for user/AI
- **Custom Scrollbar** - Minimal scrollbar with transparent track

### Design System
- **Color Palette**:
  - Background: `#17191c` (dark theme)
  - Panel Background: `#252b33`
  - Primary Blue: `#006dff`
  - Text Field Background: `#303843`
  - AI Text Color: `#b0bed1`
  - White Text: `#ffffff`

- **Typography**: Inter font family with consistent sizing and line heights
- **Spacing**: Systematic spacing using Tailwind utilities
- **Border Radius**: Consistent corner radius (12px medium, 16px large)

## Development Workflow

1. **Design-First Approach** - Figma designs are converted to pixel-perfect React components
2. **Component-Based Architecture** - Modular, reusable UI components
3. **Type Safety** - Full TypeScript implementation
4. **Modern CSS** - Utility-first styling with custom properties

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The application runs on `http://localhost:3000` (or next available port).

## Configuration

Create a `.env.local` at the project root with:

```
OPENAI_API_KEY=your_api_key_here
```

Notes:
- Generate a key at the OpenAI dashboard (`https://platform.openai.com/api-keys`).
- Billing must be enabled for API access.

## Next Steps

The current implementation provides a solid foundation for:
- Real-time messaging functionality
- User authentication
- Message persistence
- WebSocket integration
- Mobile responsiveness
- Accessibility improvements

## Architecture Notes

- **Client Components** - Interactive elements use React client components
- **Server Components** - Static content leverages Next.js server components
- **Asset Management** - Figma assets are automatically exported and referenced
- **Styling Strategy** - Combination of Tailwind utilities and custom CSS for specialized needs
