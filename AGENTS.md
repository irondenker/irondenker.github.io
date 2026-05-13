# Agent Notes

## Background Design Context

This site uses a paper-inspired background in `assets/css/style.css`. Preserve the light/dark theme toggle behavior by changing CSS variables in all three theme locations when needed:

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
- Flecks are in `body::before` as a `1600px 1200px` repeating tile.
- Fleck count should stay around `170` unless the tile size changes.
- The current tile density was chosen to match the earlier 85 flecks in a roughly `1000px 1000px` area.
- Fleck positions use fixed pixel coordinates inside the repeating tile so zoom and viewport changes do not recalculate them from percentages.
- Fleck colors intentionally vary with:
  - `--paper-fleck`
  - `--paper-fleck-soft`
  - `--paper-fleck-strong`
  - `--paper-fleck-warm`
  - `--paper-fleck-cool`
  - `--paper-fleck-faded`

Avoid these directions unless explicitly requested:

- Do not add large colorful radial glow backgrounds.
- Do not use tight crosshatch, grid, or repeated diagonal fiber patterns.
- Do not make all flecks the same color or opacity.
- Do not add a separate SVG asset for flecks; the user rejected that direction.
- Do not switch back to percentage-based fleck positions, because they visibly move when zooming.

If changing fleck density:

- Keep `body::before` as a repeated fixed tile.
- Keep `background-size: 1600px 1200px` unless intentionally recalculating density.
- For similar density, use about `85 flecks per 1,000,000px²`, which is about `160-170 flecks` for `1600px 1200px`.
- Preserve varied fleck sizes and varied fleck color variables.

If changing the broad gradient:

- Adjust `--paper-wash` only before touching the gradient geometry.
- Make small alpha changes first, usually 10-25%.
- Keep light-mode wash in the cool blue-gray family.
