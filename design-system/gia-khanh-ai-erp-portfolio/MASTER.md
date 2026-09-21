# Design System Master File — Cyberpunk / Glitch Edition

> **LOGIC:** This design system defines the global aesthetic, tokens, components, and animations for Trà Nguyễn Gia Khánh's AI × ERP Operating System portfolio.

---

**Project:** Gia Khanh AI × ERP Operating System Portfolio  
**Theme:** Cyberpunk / Glitch Design System ("High-Tech, Low-Life")  
**Design Dials:** Variance 9/10 (Futuristic / Asymmetric) | Motion 7/10 (Electric / Glitch) | Density 7/10 (HUD / Terminal)  

---

## 1. Design Philosophy

- **High-Tech, Low-Life**: A digital dystopia colliding with a noir reality of underground hackers, neon megacities, and corrupted data streams.
- **The Void vs. The Light**: Deep void black (`#0a0a0f`) illuminated by electric green (`#00ff88`), hot magenta (`#ff00ff`), and cyan (`#00d4ff`).
- **Industrial Brutalism**: Chamfered 45-degree cut corners replace rounded rectangles. Borders are HUD schematics.
- **Analog-to-Digital Artifacts**: CRT scanlines overlay, subtle chromatic aberration (RGB splitting), and terminal cursors.

---

## 2. Global Design Tokens

### Color Palette (Dark Mode Mandatory)

| Role | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Background | `#0a0a0f` | `--cyber-bg` | Deep void black |
| Foreground | `#e0e0e0` | `--cyber-fg` | Soft readable high-contrast text |
| Card | `#12121a` | `--cyber-card` | Deep obsidian / tech panel surface |
| Muted | `#1c1c2e` | `--cyber-muted` | Elevated / chip background |
| Muted Text | `#8a90a0` | `--cyber-muted-fg` | Secondary labels / meta |
| Primary Neon | `#00ff88` | `--cyber-accent` | Matrix electric green (buttons, badges, active glows) |
| Secondary Neon | `#ff00ff` | `--cyber-accent-secondary` | Hot magenta (RGB shift left, holographic accents) |
| Tertiary Neon | `#00d4ff` | `--cyber-accent-tertiary` | Electric cyan (RGB shift right, data streams) |
| Border | `#2a2a3a` | `--cyber-border` | Subtle structural border |
| Border Bright | `#3f3f58` | `--cyber-border-bright` | Emphasized HUD panels |
| Input | `#12121a` | `--cyber-input` | Terminal inputs |
| Ring | `#00ff88` | `--cyber-ring` | Focus ring |
| Destructive | `#ff3366` | `--cyber-destructive` | Warning / close buttons |

### Typography (Full Native Vietnamese & Cyberpunk Aesthetic)

- **Headings**: `"Chakra Petch", "Orbitron", sans-serif` — Geometric, robotic, commanding, 100% native Vietnamese support
- **Body**: `"JetBrains Mono", "IBM Plex Mono", monospace` — Monospaced terminal prose with full Vietnamese diacritics
- **Accent / Labels**: `"JetBrains Mono", "IBM Plex Mono", monospace` — HUD timestamps, status chips, badges

### Chamfer Corners (Clip-Path)

```css
/* Standard chamfer */
clip-path: polygon(
  0 10px, 10px 0,
  calc(100% - 10px) 0, 100% 10px,
  100% calc(100% - 10px), calc(100% - 10px) 100%,
  10px 100%, 0 calc(100% - 10px)
);
```

### Neon Glow Shadows

```css
--box-shadow-neon: 0 0 5px #00ff88, 0 0 12px rgba(0, 255, 136, 0.45);
--box-shadow-neon-sm: 0 0 3px #00ff88, 0 0 6px rgba(0, 255, 136, 0.3);
--box-shadow-neon-lg: 0 0 10px #00ff88, 0 0 20px rgba(0, 255, 136, 0.6), 0 0 40px rgba(0, 255, 136, 0.3);
--box-shadow-neon-secondary: 0 0 5px #ff00ff, 0 0 16px rgba(255, 0, 255, 0.5);
--box-shadow-neon-tertiary: 0 0 5px #00d4ff, 0 0 16px rgba(0, 212, 255, 0.5);
```

---

## 3. Mandatory Signatures

1. **Chromatic Aberration & Glitch**: Headline and splash screen glitch with red/cyan RGB splitting.
2. **Scanlines Overlay**: Full-screen CRT scanline effect applied via `body::after`.
3. **Circuit / Grid Background**: Micro-grid background with accent radial vignettes.
4. **Chamfer Cuts**: Hard angular cut corners on buttons, cards, and chips.
5. **Interactive Glows**: Elements ignite with stacked neon box-shadows on hover and `:focus-visible`.
6. **Accessibility**: Full WCAG AA contrast compliance and `prefers-reduced-motion` support.
