## Master UI

This project builds its interface with Master UI: classes on native elements, each described by a contract.

- Read the contract before writing a component's markup: `npx master-ui contract <name>`, and `npx master-ui list` to find one. Do not write markup from memory.
- Never invent a Master UI component class. Use the installed or locally owned contract, and keep project-defined classes outside the library's class families.
- Mark a state with the attribute the contract lists (`disabled`, `aria-pressed="true"`, `open`). Never add a class for a state.
- A component is a class on a native element in any framework. Do not wrap one in a component to rename it. The patterns that hold state have a component to copy: `npx master-ui add` lists them, and `ui/` may already hold one.
- To change how something looks, take the lowest step that works: a utility on the element, a theme token, a public custom property, a theme file, and only then `npx master-ui own <name>`. A project rule may select a library class to set its documented custom properties; change its implementation through owned source.
- Run `npx master-ui check` after changing markup. Fix every error and read each warning. Check the affected interactions in a browser, including the keyboard, a narrow viewport and both color schemes.

The component contracts ship in `@master/ui`. Read the official site skills in `.agents/skills/master-ui/` for markup and `.agents/skills/master-css/` for utilities and CSS compilation. The repository-level `../.agents/skills/master-design/` covers layout, typography and interaction.

For routes, localized pages and shared navigation, use `../.agents/skills/master-site/` and the installed `@master/internal-site/styles/site-contract.md`. From the repository root, `bun x -p @master/internal-skills@0.1.13 master-skills check` verifies the managed site skill. Use `sync` to restore it.

## Project commands and scope

Run commands from this directory (`site/`), the Astro/Svelte application root. Use Bun; replace the `npx master-ui` examples above with `bun x --no-install master-ui` to use the installed version.

The project uses Master CSS source compilation. `styles/globals.css` owns the preset and foundation; `styles/site.ts` imports each Master UI component this site uses as a module (never add a CSS `@import` of a component: it is delivered again in every stylesheet that names it); `styles/icons.css` owns site layout. Keep these separate imports in `styles/site.ts` so layout edits do not invalidate the Master CSS entry and every dependent stylesheet. Shared shell and document components load their own CSS. The entry is registered in `site.config.ts`. There are no locally owned components or `master-ui.json`.

The homepage (`content/page.astro`, `components/home/`, `styles/home.css`) stands on the shared home language of `@master/internal-site/home` (`design.css` tokens, `home.css` drafting rails, eyebrows and section headers, the lamp and the footer) and owns its layout components; it takes no bento or other layout component from that package. Its figures are trays of raised sheets, as on the Master UI homepage. It draws its figures in the Plotter grammar: one ink, 1-unit lines, opacity for hierarchy and dimensions derived from the icon geometry they measure. `components/home/plotter.ts` holds the build-time drawing helpers. Read `.agents/skills/plotter/SKILL.md` before adding or changing a construction drawing or its motion. The hero's plate (`HomePlate.svelte`) is drawn by a pen on a timeline: centerline first, then the stroke laid on it; keep that order when changing it. The four interface styles of the styles section (`HomeWorkbench.svelte`) are token sets in `components/home/styles.ts`, scoped to their layer, and the section's icon drawings come from the `virtual:home-showcase` module (`scripts/home-showcase.ts`); the setup prompt the homepage copies is read from the getting-started guide, so edit it there.

Preserve the shared Master Site header, existing application behavior and unrelated icon artwork. Do not add behavior scripts or framework components as part of stylesheet setup.

Validation commands (all from `site/`):

- `bun run dev` — local application, including icon source watching.
- `bun run check:ui` — strict Master UI contract checks; there is no separate lint script.
- `bun run type-check` — Astro and Svelte type checking.
- `bun run i18n:audit` — translation coverage and review audit.
- `bun run build` — prepare content and build the static website.
- `bun x --no-install playwright test -c playwright.config.ts` — website browser tests (build first; uses port 4321).
- `bun x --no-install playwright test -c playwright.dev.config.ts` — cold development server smoke tests.
- `bun run --cwd ../packages/icons test` — icon package tests.
- `bun run --cwd ../packages/icons test:types` — icon public API TypeScript tests.

After markup or stylesheet changes, verify the affected interface in light and dark modes, at desktop and narrow widths, and using the keyboard. Report any browser or check that could not run.
