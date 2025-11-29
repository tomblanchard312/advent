# 🎄 Interactive Advent Calendar

A beautiful, interactive web-based advent calendar built with React, featuring exciting animations, cool characters, and a modern UI!

## ✨ Features

- 🎨 **Beautiful Animations** - Smooth door-opening animations with 3D effects
- 🎭 **Cool Characters** - Animated emoji characters with sparkles and glow effects
- 🎁 **24 Interactive Doors** - One for each day leading up to Christmas
- ❄️ **Animated Background** - Falling snowflakes and gradient background
- 🎉 **Confetti Effects** - Celebratory confetti when opening doors
- 📱 **Responsive Design** - Works beautifully on desktop, tablet, and mobile
- 🎪 **Interactive UI** - Hover effects, smooth transitions, and engaging interactions

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm (or yarn/pnpm)

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory. You can preview the production build with:

```bash
npm run preview
```

## 🎮 How to Use

1. **View the Calendar** - See all 24 doors displayed in a grid
2. **Click a Door** - Click on any closed door to open it
3. **Watch the Animation** - Enjoy the smooth door-opening animation
4. **See the Surprise** - View the character and message for that day
5. **Close and Continue** - Click outside the modal or the × button to return

## 🎨 Technologies Used

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Framer Motion** - Smooth animations and transitions
- **CSS3** - Advanced animations and styling

## 📁 Project Structure

```
advent/
├── src/
│   ├── components/
│   │   ├── Door.jsx          # Door component with opening animation
│   │   ├── Door.css
│   │   ├── DoorModal.jsx     # Modal for displaying opened doors
│   │   ├── DoorModal.css
│   │   ├── Character.jsx     # Animated character component
│   │   └── Character.css
│   ├── data/
│   │   └── doors.js          # Door data and messages
│   ├── App.jsx               # Main app component
│   ├── App.css
│   ├── main.jsx              # Entry point
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 Customization

### Change Characters & Messages

Edit `src/data/doors.js` to modify the character types and messages for each day. Keep both arrays at length 24; elements are positionally matched (index → day).

### Modify Animations

- Door animations: `src/components/Door.css`
- Character animations: `src/components/Character.css`
- Background effects: `src/App.css`

### Adjust Colors

All color schemes can be customized in the respective CSS files. The app uses a gradient background that can be modified in `App.css`.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Deploy to GitHub Pages

### Automatic Deployment (Recommended)

This project includes a GitHub Actions workflow that automatically deploys to GitHub Pages when you push to the `main` branch.

1. **Enable GitHub Pages**:

   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**

2. **Push your code**:

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. **Wait for deployment**:
   - Go to the **Actions** tab in your repository
   - Watch the workflow run (it will build and deploy automatically)
   - Once complete, your site will be available at `https://[username].github.io/advent/`

### Manual Deployment

If you prefer to deploy manually:

1. **Install gh-pages** (if not already installed):

   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update the base path** in `vite.config.js`:

   - If your repository is named `advent`, the base is already set correctly
   - If your repository has a different name, update the `base` path in `vite.config.js` to match: `base: '/your-repo-name/'`

3. **Deploy**:

   ```bash
   npm run deploy
   ```

4. **Enable GitHub Pages**:
   - Go to **Settings** → **Pages**
   - Select **Deploy from a branch**
   - Choose the `gh-pages` branch and `/ (root)` folder
   - Click **Save**

### Important Notes

- **Repository Name**: The `base` path in `vite.config.js` is set to `/advent/`. If your repository has a different name, update it accordingly.
- **Custom Domain**: If you're using a custom domain, set `base: '/'` in `vite.config.js`
- **Build Output**: The built files go to the `dist` directory, which is automatically deployed

## 🎄 Enjoy!

Have fun opening your doors each day and discovering the surprises! Merry Christmas! 🎅✨
