<<<<<<< HEAD
# My Portfolio

A personal portfolio website for **Manindra Nath Seth** — a Computer Science and Engineering student specializing in IoT, Cyber Security, and Blockchain Technology at Heritage Institute of Technology. Built entirely with vanilla HTML, CSS, and JavaScript, with a set of custom-converted animated backgrounds and hover effects.

**Live GitHub repo:** [github.com/Manindra-NS/Portfolio](https://github.com/Manindra-NS/Portfolio.git)

---

## 📄 Pages

| Page | Description |
|---|---|
| `index.html` | Landing page with intro, name, and profile picture |
| `about.html` | Bio and skills overview (frontend, backend, other tools) |
| `projects.html` | Showcase of projects with links |
| `contact.html` | Contact details, quote, and social links |
| `documentation.html` | Project documentation / notes section |

---

## 🎨 Tech Stack

- **HTML5** — page structure
- **CSS3** — styling, responsive layout (media queries for mobile/tablet), custom animations
- **Vanilla JavaScript (ES Modules)** — scroll-based page navigation, interactive animated backgrounds
- **Font Awesome** — social media icons
- **Google Fonts** — Boldonse, Saira Stencil, Montenegrin Gothic One

No frameworks, no build tools, no bundler — everything runs directly in the browser.

---

## ✨ Animated Backgrounds & Effects

Several visual effects were originally sourced as **ReactBits** components (React + Three.js/ogl based) and manually converted into framework-free, vanilla JavaScript modules so they could run natively in this HTML/CSS/JS codebase — no React, no build step, no bundler required.

| Effect | Used On | Description |
|---|---|---|
| **Aurora** | `about.html` | Flowing WebGL gradient background (via `ogl`) |
| **DotField** | `index.html` | Interactive canvas dot grid with cursor-driven bulge/glow |
| **BorderGlow** | `projects.html` | Cursor-tracked colorful glow around project cards |
| **GlareHover** | `documentation.html` | CSS-only diagonal light-sweep hover effect on cards |
| **Ferrofluid** | `documentation.html` | WebGL fluid-like animated background (via `ogl`) |
| **Prism** | `documentation.html` | Rotating 3D raymarched prism shader background (via `ogl`) |

Each effect lives in its own self-contained `.js` module (e.g. `aurora.js`, `dot-field.js`, `border-glow.js`) paired with a matching `.css` file, and is wired into a specific page via a small page-specific `*-init.js` script (e.g. `project-init.js`, `documentation-init.js`).

External libraries used only for these effects:
- [`ogl`](https://github.com/oframe/ogl) — lightweight WebGL library (loaded via CDN as an ES module, no install step needed)

---

## 📁 Project Structure

```
├── index.html
├── about.html
├── projects.html
├── contact.html
├── documentation.html
│
├── style.css              # shared base styles (body, header, index/about layout)
├── style2.css             # projects/contact page styles
├── style3.css             # documentation page styles
│
├── script.js               # shared scroll-based page navigation logic
│
├── aurora.js / aurora.css              # Aurora background (about.html)
├── dot-field.js / dot-field.css        # DotField background (index.html)
├── border-glow.js / border-glow.css    # BorderGlow card effect (projects.html)
├── glare-hover.js / glare-hover.css     # GlareHover card effect (documentation.html)
├── ferrofluid.js / ferrofluid.css       # Ferrofluid background (documentation.html)
├── prism.js / prism.css                # Prism background (documentation.html)
│
├── about-init.js            # initializes Aurora on about.html
├── index-dot-init.js        # initializes DotField on index.html
├── project-init.js          # initializes BorderGlow (+ DotField) on projects.html
├── documentation-init.js    # initializes GlareHover, Ferrofluid, Prism on documentation.html
│
└── pictures/                 # images used across the site
```

---

## 🚀 Running Locally

Since several scripts use ES Modules (`<script type="module">`) and fetch libraries from a CDN, this project needs to be served over `http://` rather than opened directly as a `file://` path (module imports are blocked by CORS otherwise).

**Recommended: VS Code Live Server**
1. Open the project folder in VS Code
2. Install the **Live Server** extension
3. Right-click `index.html` → **Open with Live Server**

**Alternative: Python's built-in server**
```bash
python -m http.server
```
Then visit `http://localhost:8000`.

---

## 🛠 Skills Featured

- **Frontend:** HTML, CSS, JavaScript
- **Other:** Python, C, MS Word, MS Excel, MS PowerPoint

---

## 📬 Contact

- **Email:** manindraseth3@gmail.com
- **Location:** Kolkata, West Bengal, 700001
- **LinkedIn:** [Manindra Nath Seth](https://www.linkedin.com/in/manindra-nath-seth-36557b376)
- **Instagram:** [@sostar_vlogger_manindra](https://www.instagram.com/sostar_vlogger_manindra)
- **X (Twitter):** [@Manindra_Seth](https://x.com/Manindra_Seth)

---

## 📝 Credits

- Animated background/hover effects adapted from [ReactBits](https://reactbits.dev) components, converted from React to vanilla JavaScript for this project.
- Icons via [Font Awesome](https://fontawesome.com).
- Fonts via [Google Fonts](https://fonts.google.com).
=======
