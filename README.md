# 🚀 TaskFlow

TaskFlow is a premium, all-in-one productivity and collaboration platform designed for modern engineering teams. It combines project management, real-time communication, and performance analytics into a single, unified experience.

## ✨ Key Features

### 📂 Project Management (Kanban)
- Dynamic Kanban boards with drag-and-drop support.
- Project-specific documentation (Wiki) integrated directly into the workspace.
- Clear task lifecycle: To Do → In Progress → Done.

### 💬 Messaging Hub (Discussions)
- Categorized discussion groups (Architecture, Frontend, Design, etc.).
- Real-time chat with Markdown support for code snippets.
- Integrated participant management and group invitation system.

### ⏱️ Productivity Suite
- **Time Tracker**: Integrated Pomodoro timer for deep focus sessions.
- **Activity Logs**: Manual time entry and historical tracking for billable hours.
- **Meeting Hub**: Schedule syncs, manage agendas, and track action items.

### 📈 Advanced Analytics
- Real-time performance tracking using interactive Spline charts.
- Team velocity metrics and project health monitoring.
- Data-driven insights to identify bottlenecks.

### 📚 Knowledge Base (Wiki)
- Centralized team documentation hub.
- Searchable articles with rich text support.
- Category-based organization for system design, SOPs, and guild notes.

### 🌐 Client Portal
- Secure external sharing for stakeholders.
- Board-only access with audit logs and access control.

### ✨ AI Assistant
- Integrated AI coding assistant for documentation, code reviews, and brainstorming.

## 🛠️ Tech Stack
- **Frontend**: SvelteKit 2 + Svelte 5 (Runes)
- **Styling**: Tailwind CSS 4
- **Components**: Shadcn-svelte (ui-bits)
- **State Management**: Svelte Stores + Runes ($state, $derived)
- **Design**: Glassmorphism, Dark Mode Support, Premium Animations (Framer-like transitions)

## 📁 Project Structure
- `src/routes`: SvelteKit routes (split into `(public)`, `auth`, and `app`).
- `src/lib/components`: Reusable UI components (header, footer, charts, etc.).
- `src/lib/store`: Global state management for theme, tracks, and platform data.
- `src/lib/images`: Static assets and branding.

## 🚀 Getting Started

1. **Install Dependencies**:
   ```sh
   pnpm install
   ```

2. **Run Development Server**:
   ```sh
   pnpm dev
   ```

3. **Build for Production**:
   ```sh
   pnpm build
   ```

## 📄 License
This project is proprietary and built for engineering excellence.
