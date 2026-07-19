# SILDIA Corporate Website Showcase

A modern, high-performance, single-page corporate website designed for **SILDIA Informatics India Private Limited** (subsidiary of State Informatics Limited, Mauritius). The website features premium dark/light theme switching, interactive canvas visualizations, and a fully validated contact portal.

---

## 🚀 How to Run the Project

### Option 1: Quick Run (Python - Recommended)
No installation required. Run this command inside the project root folder:
```bash
python -m http.server 8000
```
Then open your browser and navigate to **[http://localhost:8000](http://localhost:8000)**.

### Option 2: Developer Mode (Node.js + Vite)
If you have Node.js installed, run:
```bash
# Install Vite
npm install

# Start development server
npm run dev
```

---

## 📂 Project Structure

*   **[index.html](index.html)**: Main page structure containing complete SEO tags, section definitions, responsive layouts, and the inline corporate SVG logo.
*   **[style.css](style.css)**: Established custom responsive design system (supporting dual-theme variables, scroll reveals, keyframes, and animations).
*   **[main.js](main.js)**: Frontend logic including scroll-reveal triggers, mobile navigation drawer, form validation, and interactive canvas particles.
*   **[package.json](package.json)** / **[vite.config.js](vite.config.js)**: Configuration files for module builds and Vite configurations.

---

## ✨ Key Features & Showcases

### 🎨 Brand-Aligned Theme Switching
*   Includes a theme toggle button (Sun/Moon icons) next to the CTA header.
*   Uses `localStorage` to cache user preference (keeps the chosen theme on reload).
*   The SVG logo automatically adapts: renders **pure white** in Dark mode for high contrast, and transforms to its **official Navy Blue** color in Light mode.

### 🕸️ Interactive Connected Canvas
*   The Hero section is backed by an HTML5 canvas rendering a dynamic node-connecting network graph.
*   Particles bounce off boundaries, drift, and dynamically connect to each other.
*   **Mouse attraction**: hovering over the canvas creates temporary pointer connection lines and gently repels nearby nodes.

### 📬 Validated Contact Form
*   Fully interactive contact form that checks all fields before submission.
*   Provides real-time warning indicators for invalid inputs.
*   Transitions with a smooth fade-in to a green checkmark success state card upon success.

---

## 📦 How to Share with the Team

### Method A: Zip & Email/Teams
Simply zip the `Project1` folder. Since it doesn't contain a bulky `node_modules` folder, the zip file will be extremely small (less than 100 KB) and can be shared instantly over email, Slack, or Microsoft Teams.

### Method B: Git & GitHub (Recommended for Collaboration)
1. Initialize a repository in the project folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of SILDIA corporate website"
   ```
2. Create a repository on GitHub and link it:
   ```bash
   git remote add origin <your-github-repo-url>
   git branch -M main
   git push -u origin main
   ```
3. Share the GitHub URL. Your team will see this file as the homepage!
