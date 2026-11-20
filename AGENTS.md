# Agent Notes

## Background Design Context

This site uses a paper-inspired background in `assets/css/style.css`. Preserve the light/dark theme toggle behavior by changing CSS variables in all four theme locations when needed:

- `:root` for default dark values
- `@media (prefers-color-scheme: light) :root` for system light default
- `html[data-theme="dark"]`
- `html[data-theme="light"]`

The intended background mood is:

- A worn paper texture, roughly like old typewriter paper.
- Faint lined-notebook rules behind the content.
- Irregular speckling and paper grain, but not a decorative pattern.
- Light mode should keep a cool blue-gray wash, not ivory/gold-heavy gradients.
- Dark mode should feel like darkened paper, not a glossy radial-gradient hero background.

Current important values:

- `--paper-wash`
  - Dark: `rgba(255, 244, 218, .015)`
  - Light: `rgba(203, 224, 242, .168)`
- Flecks are in `body::before` as a `1600px 1200px` repeating lossless WebP tile selected per theme and pixel density (1x, 1.5x, and 2x).
- Fleck count should stay around `170` unless the tile size changes.
- The current tile density was chosen to match the earlier 85 flecks in a roughly `1000px 1000px` area.
- The raster tiles were captured from 170 fixed-pixel source positions, so zoom and viewport changes do not recalculate flecks from percentages.
- Fleck source colors intentionally vary with the variables below. They document the regeneration palette; the current runtime pixels are pre-rendered into the WebP tiles:
  - `--paper-fleck`
  - `--paper-fleck-soft`
  - `--paper-fleck-strong`
  - `--paper-fleck-warm`
  - `--paper-fleck-cool`
  - `--paper-fleck-faded`
- Paper grain in `body::after` is also a theme-specific lossless WebP image set, repeated as a `900px 900px` CSS tile. It was captured from the prior six-octave turbulence appearance so the browser no longer evaluates an SVG filter or mask at paint time.

Avoid these directions unless explicitly requested:

- Do not add large colorful radial glow backgrounds.
- Do not use tight crosshatch, grid, or repeated diagonal fiber patterns.
- Do not make all flecks the same color or opacity.
- Do not add a separate SVG asset for flecks; the user rejected that direction.
- Do not switch back to percentage-based fleck positions, because they visibly move when zooming.
- Do not restore the 170 live CSS radial gradients or the SVG `feTurbulence` mask without a before/after paint benchmark; those effects caused severe startup raster cost on fallback rendering paths.

If changing fleck density:

- Keep `body::before` as a repeated fixed tile.
- Keep `background-size: 1600px 1200px` unless intentionally recalculating density.
- For similar density, use about `85 flecks per 1,000,000px²`, which is about `160-170 flecks` for `1600px 1200px`.
- Preserve varied fleck sizes and the source color palette, then regenerate dark/light 1x, 1.5x, and 2x lossless tiles together.

If changing the broad gradient:

- Adjust `--paper-wash` only before touching the gradient geometry.
- Make small alpha changes first, usually 10-25%.
- Keep light-mode wash in the cool blue-gray family.
