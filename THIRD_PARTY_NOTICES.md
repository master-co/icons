# Third-party notices

Master Icons' new source code and drawings use MIT. All icons are alpha design studies, not affiliated with or endorsed by the reference projects.

## Hugeicons Free — MIT

Copyright (c) 2025 Hugeicons. Full license: `licenses/hugeicons-MIT.txt`.

The 12 pilot subjects are documented as study/redraw work after Hugeicons Free: arrow-right, check, search, home, folder, file-text, calendar, settings, bell, user, heart, star. Their native optical coordinates and corner treatments were reconstructed, not mechanically converted from arbitrary SVGs. Attribution is retained conservatively for these studies. Individual SVG downloads include the full MIT notice; packages and ZIP downloads include the license files.

Upstream repository: https://github.com/hugeicons/hugeicons

Pinned commit: `834e28d965946c1ee60d080027fe9dae4adc58d0`.

No Hugeicons Pro artwork is included. Of the remaining drawings, 377 are authored from Master geometry primitives and three are Lucide-informed adapted redraws described below. `dist/catalog.json` identifies the provenance of every subject; `references/manifest.json` preserves the historical 48 comparison files; `references/current.json` combines 420 UI comparisons, 20 organization comparisons and 120 productivity comparisons and 224 expansion comparisons from their versioned manifests, including semantic versus structure-only matches.

## Lucide — ISC; three adapted redraws

Copyright (c) 2026 Lucide Icons and Contributors. Full license and inherited Feather notices: `licenses/lucide.txt`.

Craft 01 redraws **megaphone** and **handshake** after Lucide's curved horn/grip and interlocking-hand constructions, at the user's request. Master rewrites their curves, proportions, corner treatments and native-size details. Attribution is retained conservatively for this deliberate adaptation. Individual SVG downloads include the complete upstream license; React packages and SVG archives include the license file and these notices. The original assets remain in the comparison workspace.

Layers 01 reconstructs **layers** after Lucide’s curved sheet edges and equal-width stack, with Master proportions and local corner treatments.

Pinned commit: `55782beff3a0133df79c417eb68f96e8f19e2404`. Original paths: `icons/megaphone.svg`, `icons/handshake.svg`, `icons/layers.svg` in `lucide-icons/lucide`.

## Comparison-only assets

These unmodified originals are stored in `references/` for the local design study. The comparison page changes displayed color and dimensions only. These references are **excluded from the distributable icon library package** and are not Master icons.

| Project | Commit | License copy |
| --- | --- | --- |
| Heroicons | `616b7a4dbbf3d011760af8066262cd5c6b3868f3` | `licenses/heroicons.txt` (MIT) |
| Phosphor | `2b75f3ad12b420c9504ef05df8d2564a28f8500e` | `licenses/phosphor.txt` (MIT) |
| Radix | `112af91ad275a63c3a29b0da2588342af74ef9bf` | `licenses/radix.txt` (MIT) |
| Feather | `3dc050d97405062eba78aa57115c0a15c63abdaa` | `licenses/feather.txt` (MIT) |
| Tabler | `4581ad20d8d13e24f6c3be75caaea1c4ad6c4b35` | `licenses/tabler.txt` (MIT) |
| Iconoir | `39834e3f193bc0cca2c36bebb6a650471977433d` | `licenses/iconoir.txt` (MIT) |
| Lucide | `55782beff3a0133df79c417eb68f96e8f19e2404` | `licenses/lucide.txt` (ISC and inherited Feather MIT notices) |

Original notices are preserved in full. Do not remove these license copies when distributing the comparison workspace. Except for the three adapted redraws explicitly listed above, references are comparison-only assets.

## Research versus attribution

Studying a library or selecting a subject for a pilot review does not by itself assign authorship to that library. The initial notices above are preserved explicitly in `src/provenance.mjs`, independently of the pilot selection. Independently authored additions do not acquire third-party attribution merely by being compared. Per-icon source labels are not displayed in the product UI; applicable notices and comparison-asset credits remain in their appropriate files.

## Brand silhouettes · brands-01

63 brand silhouettes are reproduced from Simple Icons, commit `17cd4ee07612198a1d8777a060d4100423762a8b`, under its [CC0 dedication](licenses/simple-icons-CC0.txt). Its [disclaimer](licenses/simple-icons-DISCLAIMER.md) is preserved. Brand names, trademarks and original artwork remain the property of their respective owners; neither the CC0 dedication nor the Master code MIT license grants trademark rights or implies endorsement.

The Master mark uses the locally owned `Master brand/logo/mark/master-mark-small-on-light.svg`: approved small-size silhouette, gradient overlay removed for monochrome use. Brand paths retain their shape; only monochrome paint, size-specific optical envelope and placement change. Every source SVG and SHA-256 is preserved in `references/brands-01/` and `packages/icons/src/brands.json`. No additional upstream runtime dependency is installed.

| Export name | Source artwork | Official source / guidelines |
| --- | --- | --- |
| `brand-master` | [Master brand](https://github.com/master-co) | Master-owned brand repository |
| `brand-apple` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/apple.svg) | [Official source](https://www.apple.com) |
| `brand-google` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/google.svg) | [Official source](https://partnermarketinghub.withgoogle.com) · [Guidelines](https://about.google/brand-resource-center/brand-elements/) |
| `brand-gmail` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/gmail.svg) | [Official source](https://fonts.gstatic.com/s/i/productlogos/gmail_2020q4/v8/192px.svg) |
| `brand-google-drive` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/googledrive.svg) | [Official source](https://developers.google.com/drive/web/branding) |
| `brand-google-gemini` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/googlegemini.svg) | [Official source](https://gemini.google.com) |
| `brand-facebook` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/facebook.svg) | [Official source](https://about.meta.com/brand/resources/facebook/logo) · [Guidelines](https://about.meta.com/brand/resources/facebook/logo) |
| `brand-instagram` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/instagram.svg) | [Official source](https://about.meta.com/brand/resources/instagram) · [Guidelines](https://about.meta.com/brand/resources/instagram) |
| `brand-threads` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/threads.svg) | [Official source](https://www.meta.com/brand/resources/instagram/threads) · [Guidelines](https://www.meta.com/brand/resources/instagram/threads) |
| `brand-tiktok` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/tiktok.svg) | [Official source](https://tiktok.com) |
| `brand-x` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/x.svg) | [Official source](https://x.com) · [Guidelines](https://about.x.com/en/who-we-are/brand-toolkit) |
| `brand-bluesky` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/bluesky.svg) | [Official source](https://bsky.social/about/blog/press-faq) · [Guidelines](https://bsky.social/about/blog/press-faq) |
| `brand-mastodon` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/mastodon.svg) | [Official source](https://github.com/mastodon/mastodon/blob/7ccf7a73f1c47a8c03712c39f7c591e837cf6d08/app/javascript/images/logo-symbol-icon.svg) · [Guidelines](https://joinmastodon.org/branding) |
| `brand-reddit` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/reddit.svg) | [Official source](https://www.redditinc.com/brand) · [Guidelines](https://www.redditinc.com/brand) |
| `brand-discord` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/discord.svg) | [Official source](https://discord.com/branding) · [Guidelines](https://discord.com/branding) |
| `brand-telegram` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/telegram.svg) | [Official source](https://telegram.org/tour/screenshots) |
| `brand-whatsapp` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/whatsapp.svg) | [Official source](https://about.meta.com/brand/resources/whatsapp/whatsapp-brand) · [Guidelines](https://about.meta.com/brand/resources/whatsapp/whatsapp-brand) |
| `brand-line` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/line.svg) | [Official source](https://line.me/en/logo) · [Guidelines](https://line.me/en/logo) |
| `brand-wechat` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/wechat.svg) | [Official source](https://wechat.design/tool/brand) · [Guidelines](https://wechat.design/brand/main-brand) |
| `brand-signal` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/signal.svg) | [Official source](https://signal.org/brand) · [Guidelines](https://signal.org/brand) |
| `brand-snapchat` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/snapchat.svg) | [Official source](https://www.snapchat.com/brand-guidelines) · [Guidelines](https://www.snapchat.com/brand-guidelines) |
| `brand-pinterest` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/pinterest.svg) | [Official source](https://business.pinterest.com/en/brand-guidelines) · [Guidelines](https://business.pinterest.com/en/brand-guidelines) |
| `brand-youtube` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/youtube.svg) | [Official source](https://www.youtube.com/howyoutubeworks/resources/brand-resources/#logos-icons-and-colors) · [Guidelines](https://www.youtube.com/howyoutubeworks/resources/brand-resources/#logos-icons-and-colors) |
| `brand-twitch` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/twitch.svg) | [Official source](https://brand.twitch.tv) · [Guidelines](https://brand.twitch.tv) |
| `brand-spotify` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/spotify.svg) | [Official source](https://developer.spotify.com/documentation/general/design-and-branding/#using-our-logo) · [Guidelines](https://developer.spotify.com/documentation/general/design-and-branding/#using-our-logo) |
| `brand-soundcloud` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/soundcloud.svg) | [Official source](https://press.soundcloud.com) |
| `brand-vimeo` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/vimeo.svg) | [Official source](https://press.vimeo.com/brand-guidelines) · [Guidelines](https://press.vimeo.com/brand-guidelines) |
| `brand-github` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/github.svg) | [Official source](https://github.com/logos) · [Guidelines](https://github.com/logos) |
| `brand-gitlab` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/gitlab.svg) | [Official source](https://about.gitlab.com/press/press-kit/) · [Guidelines](https://about.gitlab.com/handbook/marketing/corporate-marketing/brand-activation/trademark-guidelines/) |
| `brand-bitbucket` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/bitbucket.svg) | [Official source](https://atlassian.design/resources/logo-library) · [Guidelines](https://atlassian.design/foundations/logos) |
| `brand-figma` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/figma.svg) | [Official source](https://www.figma.com/using-the-figma-brand/) · [Guidelines](https://www.figma.com/using-the-figma-brand/) |
| `brand-framer` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/framer.svg) | [Official source](https://framer.com) |
| `brand-sketch` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/sketch.svg) | [Official source](https://www.sketch.com/about-us/#press) · [Guidelines](https://www.sketch.com/about-us/#press) |
| `brand-notion` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/notion.svg) | [Official source](https://www.notion.so) |
| `brand-linear` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/linear.svg) | [Official source](https://linear.app) |
| `brand-trello` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/trello.svg) | [Official source](https://atlassian.design/resources/logo-library) · [Guidelines](https://atlassian.design/foundations/logos) |
| `brand-asana` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/asana.svg) | [Official source](https://asana.com/brand) · [Guidelines](https://asana.com/brand) |
| `brand-dropbox` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/dropbox.svg) | [Official source](https://www.dropbox.com/branding) |
| `brand-zoom` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/zoom.svg) | [Official source](https://brand.zoom.us/media-library/) · [Guidelines](https://brand.zoom.us/usage-legal/) |
| `brand-vercel` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/vercel.svg) | [Official source](https://vercel.com/geist/brands) · [Guidelines](https://vercel.com/geist/brands) |
| `brand-netlify` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/netlify.svg) | [Official source](https://www.netlify.com/press/) · [Guidelines](https://www.netlify.com/press/) |
| `brand-cloudflare` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/cloudflare.svg) | [Official source](https://www.cloudflare.com/logo/) · [Guidelines](https://www.cloudflare.com/trademark/) |
| `brand-docker` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/docker.svg) | [Official source](https://www.docker.com/company/newsroom/media-resources) |
| `brand-kubernetes` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/kubernetes.svg) | [Official source](https://github.com/kubernetes/kubernetes/tree/cac53883f4714452f3084a22e4be20d042a9df33/logo) |
| `brand-npm` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/npm.svg) | [Official source](https://www.npmjs.com) · [Guidelines](https://docs.npmjs.com/policies/logos-and-usage) |
| `brand-node-js` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/nodedotjs.svg) | [Official source](https://nodejs.org/en/about/branding) · [Guidelines](https://nodejs.org/en/about/branding) |
| `brand-react` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/react.svg) | [Official source](https://github.com/facebook/create-react-app/blob/282c03f9525fdf8061ffa1ec50dce89296d916bd/test/fixtures/relative-paths/src/logo.svg) |
| `brand-svelte` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/svelte.svg) | [Official source](https://github.com/sveltejs/branding/blob/c4dfca6743572087a6aef0e109ffe3d95596e86a/svelte-logo.svg) |
| `brand-astro` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/astro.svg) | [Official source](https://astro.build/press) |
| `brand-next-js` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/nextdotjs.svg) | [Official source](https://vercel.com/design/brands#next-js) · [Guidelines](https://vercel.com/design/brands#next-js) |
| `brand-nuxt` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/nuxt.svg) | [Official source](https://nuxt.com/design-kit) · [Guidelines](https://nuxt.com/design-kit) |
| `brand-typescript` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/typescript.svg) | [Official source](https://www.typescriptlang.org/branding) · [Guidelines](https://www.typescriptlang.org/branding) |
| `brand-python` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/python.svg) | [Official source](https://www.python.org/community/logos/) · [Guidelines](https://www.python.org/community/logos/) |
| `brand-go` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/go.svg) | [Official source](https://blog.golang.org/go-brand) · [Guidelines](https://blog.golang.org/go-brand) |
| `brand-shopify` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/shopify.svg) | [Official source](https://www.shopify.com/brand-assets) · [Guidelines](https://www.shopify.com/brand-assets) |
| `brand-stripe` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/stripe.svg) | [Official source](https://stripe.com/newsroom/information) |
| `brand-paypal` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/paypal.svg) | [Official source](https://www.paypal.com/us) · [Guidelines](https://newsroom.paypal-corp.com/media-resources) |
| `brand-patreon` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/patreon.svg) | [Official source](https://www.patreon.com/brand) · [Guidelines](https://www.patreon.com/brand) |
| `brand-ko-fi` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/kofi.svg) | [Official source](https://more.ko-fi.com/brand-assets) · [Guidelines](https://more.ko-fi.com/brand-assets) |
| `brand-steam` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/steam.svg) | [Official source](https://partner.steamgames.com/doc/marketing/branding) · [Guidelines](https://partner.steamgames.com/doc/marketing/branding) |
| `brand-epic-games` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/epicgames.svg) | [Official source](https://dev.epicgames.com/docs/services/en-US/EpicAccountServices/DesignGuidelines/index.html#epicgamesbrandguidelines) · [Guidelines](https://dev.epicgames.com/docs/services/en-US/EpicAccountServices/DesignGuidelines/index.html#epicgamesbrandguidelines) |
| `brand-claude` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/claude.svg) | [Official source](https://claude.ai) |
| `brand-anthropic` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/anthropic.svg) | [Official source](https://www.anthropic.com) |
| `brand-perplexity` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/perplexity.svg) | [Official source](https://www.perplexity.ai) |

## Brand additions · brands-02

Eight additional names: OpenAI, ChatGPT, Microsoft, LinkedIn, Slack, Cursor, Supabase and Vite. OpenAI and ChatGPT share the official 2025 Blossom. The OpenAI artwork is subject to its own [brand terms notice](licenses/openai-brand.txt), not the Master MIT license or Simple Icons CC0 dedication.

Microsoft, LinkedIn and Slack retain the source silhouettes from Simple Icons v12.4.0 (`32b07a5b798b84b97f2cbbb5b69ec7cb80472f73`); these are historical asset sources, not claims that the current Simple Icons catalog includes them. Cursor, Supabase and Vite use the pinned current collection (`17cd4ee07612198a1d8777a060d4100423762a8b`). Brand owners retain their rights; the Simple Icons disclaimer applies.

| Name | Vector source | Brand reference |
| --- | --- | --- |
| `brand-openai` | [OpenAI brand](https://cdn.openai.com/brand/OpenAI-Logos-2025.zip) | [Official source / guidelines](https://openai.com/brand/) |
| `brand-chatgpt` | [OpenAI brand](https://cdn.openai.com/brand/OpenAI-Logos-2025.zip) | [Official source / guidelines](https://openai.com/brand/) |
| `brand-microsoft` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/32b07a5b798b84b97f2cbbb5b69ec7cb80472f73/icons/microsoft.svg) | [Official source / guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks) |
| `brand-linkedin` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/32b07a5b798b84b97f2cbbb5b69ec7cb80472f73/icons/linkedin.svg) | [Official source / guidelines](https://brand.linkedin.com/linkedin-logo) |
| `brand-slack` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/32b07a5b798b84b97f2cbbb5b69ec7cb80472f73/icons/slack.svg) | [Official source / guidelines](https://api.slack.com/media-kit) |
| `brand-cursor` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/cursor.svg) | [Official source / guidelines](https://cursor.com/brand) |
| `brand-supabase` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/supabase.svg) | [Official source / guidelines](https://github.com/supabase/supabase/blob/4031a7549f5d46da7bc79c01d56be4177dc7c114/packages/common/assets/images/supabase-logo-wordmark--light.svg) |
| `brand-vite` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/vite.svg) | [Official source / guidelines](https://github.com/voidzero-dev/community-design-resources/blob/55902097229cf01cf2a4ceb376f992f5cf306756/brand-assets/vite/vite-icon-color-bracketless.svg) |

Source SVGs are preserved in `references/brands-02/`. Paths retain their source geometry, with individual 16 / 20 / 24 placement and occupied size. The OpenAI archive includes oversized canvas padding and enclosing clip rectangles: placement uses its unchanged ink bounds, and redundant clips are omitted.
