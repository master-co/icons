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


## Atlas 01–05: non-brand icon additions

The 50 drawings retain explicit per-icon research and refinement records in `docs/review/atlas-craft-01/ledger.json`. Adapted constructions are independently redrawn for Master optical sizes and corner profiles; rewriting coordinates does not remove upstream attribution.

| Source | Adapted drawings | License |
| --- | --- | --- |
| Lucide | `bus`, `helicopter`, `sailboat`, `ship`, `backpack`, `tent`, `fuel`, `cloud-rain`, `cloud-snow`, `cloud-lightning`, `cloud-fog`, `cloud-sun`, `cloud-moon`, `sunrise`, `sunset`, `wind`, `leaf`, `sprout`, `tree-pine`, `mountain`, `mountain-snow`, `cat`, `dog`, `bird`, `turtle` | ISC; licenses/lucide.txt |
| Tabler | `car`, `anchor`, `caravan`, `traffic-cone`, `road`, `cactus`, `fish`, `snail`, `paw-print` | MIT; licenses/tabler.txt |
| Phosphor | `tram`, `bicycle`, `motorcycle`, `scooter`, `traffic-light`, `rabbit`, `butterfly` | MIT; licenses/phosphor.txt |

Other Atlas drawings use independent construction. Pinned originals, roles and checksums for all comparisons are in `references/atlas-01/manifest.json`. Iconoir and Hugeicons are comparison references only; their existing license files remain included.

### Atlas source re-comparison: cactus

The revised `cactus` develops Phosphor's continuous, fleshy branch construction while retaining its earlier Tabler-derived proportions and staggered pose. The original Tabler attribution is retained alongside the added Phosphor attribution in `packages/icons/src/atlas-provenance.json`. Both complete MIT notices are included in `licenses/cactus-sources.txt` and embedded in each cactus SVG; the combined file is also shipped in the package and downloadable ZIPs.

- Tabler: `tabler/tabler-icons`, commit `4581ad20d8d13e24f6c3be75caaea1c4ad6c4b35`, `icons/outline/cactus.svg`; Copyright (c) 2020-2026 Paweł Kuna.
- Phosphor: `phosphor-icons/core`, commit `2b75f3ad12b420c9504ef05df8d2564a28f8500e`, `assets/regular/cactus.svg`; Copyright (c) 2023 Phosphor Icons.
- The source comparison records describe the saved comparison assets; the current adaptation relationship is recorded separately in `designOrigin` and the exported catalog provenance. Earlier geometry and attribution remain in `references/atlas-recompare-01/`.

### Atlas source re-comparison of waves

The current `waves` uses the independent construction restored from the round's baseline. The withdrawn candidate adapted Tabler's `icons/outline/ripple.svg` at commit `4581ad20d8d13e24f6c3be75caaea1c4ad6c4b35` (Copyright (c) 2020-2026 Paweł Kuna, MIT, `licenses/tabler.txt`). Its attribution is preserved in the [superseded review](docs/review/atlas-recompare-01/114-user-restore/superseded.json).

The bee comparison additionally includes unmodified OpenMoji `1F41D.svg` by OpenMoji contributors, CC BY-SA 4.0, from https://github.com/hfg-gmuend/openmoji/blob/3e01de523ddefe9c5e46a7765b15efef04bf9002/black/svg/1F41D.svg (license: `licenses/openmoji-CC-BY-SA-4.0.txt`), and Material Design Icons `bee.svg` by the Pictogrammers contributors from https://github.com/Templarian/MaterialDesign/blob/2424e748e0cc63ab7b9c095a099b9fe239b737c0/svg/bee.svg (Apache 2.0; `licenses/mdi-notice.txt` and `licenses/Apache-2.0.txt`). They are reproduced for comparison, not distributed as Master geometry. The review renderer recolors monochrome sources to the current foreground for dark backgrounds without changing saved originals. Lucide Lab bee remains an explicitly experimental supplementary reference.


## Atlas 06: produce

Individual source observations and native-size decisions are in `docs/review/atlas-craft-02/ledger.json`. Adapted redraws retain the following notices in each SVG and ZIP:

- Lucide: `apple-fruit`, `carrot`. ISC, licenses/lucide.txt.
- Tabler: `cherry`, `grape`, `banana`, `mushroom`, `wheat`. MIT, licenses/tabler.txt.
- Phosphor: `citrus`. MIT, licenses/phosphor.txt.

`corn` and `egg` use independent construction. Corn compares Hugeicons and MDI; the existing Hugeicons MIT and MDI Apache-2.0 notices apply to the saved originals only. All 20 pinned comparison records are in `references/atlas-craft-02/manifest.json`.

### Atlas source re-comparison: mushroom

The revised `mushroom` develops Hugeicons Free's curved cap underside and flared stem while retaining the earlier Tabler-derived closed cap and stem construction. Both sources are recorded in `packages/icons/src/atlas-provenance.json`; the previous Tabler record remains preserved as `baseSource`. The combined `licenses/mushroom-sources.txt` contains both complete MIT notices and is embedded in each mushroom SVG and included in the package and downloadable ZIPs.

- Tabler: `tabler/tabler-icons`, commit `4581ad20d8d13e24f6c3be75caaea1c4ad6c4b35`, `icons/outline/mushroom.svg`; Copyright (c) 2020-2026 Paweł Kuna.
- Hugeicons Free: `hugeicons/hugeicons`, commit `834e28d965946c1ee60d080027fe9dae4adc58d0`, `icons/mushroom-01.svg`; Copyright (c) 2025 Hugeicons.

The source comparison records describe saved original assets; the current dual-source adaptation is recorded in `designOrigin` and exported catalog provenance. Earlier geometry and attribution are preserved in `references/atlas-recompare-01/`.

### Atlas source re-comparison: wheat

The current `wheat` is redrawn from Lucide's seven-grain, diagonal-ear construction, with Master optical strokes, actual small corner arcs in soft/rounded, and stem ink clipped outside the grain cavities. Lucide source: `lucide-icons/lucide`, commit `55782beff3a0133df79c417eb68f96e8f19e2404`, `icons/wheat.svg`; Copyright (c) 2026 Lucide Icons and Contributors, ISC.

The earlier three-grain drawing was adapted from Tabler's `icons/outline/wheat.svg` at commit `4581ad20d8d13e24f6c3be75caaea1c4ad6c4b35` (Copyright (c) 2020-2026 Paweł Kuna, MIT). Its geometry and attribution remain in the task baseline and `baseSource`; it is historical provenance, not the source of the current seven-grain arrangement. `licenses/wheat-sources.txt` includes the complete earlier Tabler and current Lucide notices, embedded in each wheat SVG and included in package and ZIP outputs.


## Atlas 07-drinks

Individual comparisons and changes: `docs/review/atlas-craft-03/ledger.json`. Pinned source originals and checksums: `references/atlas-craft-03/manifest.json`.

- Adapted Lucide constructions: `coffee`, `cup-soda`, `beer`, `cooking-pot`. ISC; licenses/lucide.txt.
- Adapted Phosphor constructions: `wine`. MIT; licenses/phosphor.txt.
- Adapted Hugeicons Free constructions: `milk`. MIT; licenses/hugeicons-MIT.txt.
- Adapted Tabler constructions: `bottle`. MIT; licenses/tabler.txt.
- Adapted Iconoir constructions: `glass-water`. MIT; licenses/iconoir.txt.
- Independent construction: `kettle`.
- Adapted OpenMoji construction: `teapot`. The domed lid and short knob were adopted from OpenMoji U+1FAD6, with redrawn spout, handle, native proportions and joins. The teapot artwork and its modifications are licensed under **CC BY-SA 4.0** (https://creativecommons.org/licenses/by-sa/4.0/), not the package’s general MIT grant. Source and adapter attribution plus the complete license: `licenses/teapot-openmoji-CC-BY-SA-4.0.txt`. Earlier independent geometry remains in `references/atlas-recompare-01/master-before.json`.

Pinned OpenMoji source: unmodified OpenMoji 1FAD6 by OpenMoji contributors, CC BY-SA 4.0; https://github.com/hfg-gmuend/openmoji/blob/3e01de523ddefe9c5e46a7765b15efef04bf9002/black/svg/1FAD6.svg. Full terms: licenses/openmoji-CC-BY-SA-4.0.txt. The original remains a separate comparison asset; the current Master teapot adaptation is identified above and carries its own source and adapter notice.


## Atlas 08-food

Individual comparisons and changes: `docs/review/atlas-craft-04/ledger.json`. Pinned source originals and checksums: `references/atlas-craft-04/manifest.json`.

- Adapted Lucide constructions: `utensils`, `salad`, `sandwich`, `ice-cream`, `cookie`. ISC; licenses/lucide.txt.
- Adapted Tabler constructions: `pizza`, `burger`, `cake`, `bread`. MIT; licenses/tabler.txt.
- Initial independent construction of `soup` was superseded by the Tabler adaptation recorded below.


## Atlas soup form refinement

`soup` now adapts the continuous bowl-and-foot construction from Tabler (MIT; licenses/tabler.txt). Individual source comparison, preserved earlier decision and current evidence: `docs/review/atlas-craft-06/ledger.json`.


## Atlas 09-home

Individual comparisons and changes: `docs/review/atlas-craft-05/ledger.json`. Pinned source originals and checksums: `references/atlas-craft-05/manifest.json`.

- Adapted Lucide constructions: `bed`, `sofa`, `armchair`, `door-open`, `door-closed`, `shower-head`. ISC; licenses/lucide.txt.
- Adapted Phosphor constructions: `lamp`, `desk`, `bathtub`. MIT; licenses/phosphor.txt.
- Adapted Tabler constructions: `fence`. MIT; licenses/tabler.txt.


## Atlas 10-appliances

Individual comparisons and changes: `docs/review/atlas-craft-07/ledger.json`. Pinned source originals and checksums: `references/atlas-craft-07/manifest.json`.

- Adapted Tabler constructions: `refrigerator`, `iron`. MIT; licenses/tabler.txt.
- Adapted Lucide constructions: `washing-machine`, `microwave`, `heater`. ISC; licenses/lucide.txt.
- Adapted Phosphor constructions: `oven`, `fan`. MIT; licenses/phosphor.txt.
- Adapted Iconoir constructions: `air-conditioner`. MIT; licenses/iconoir.txt.
- Adapted Hugeicons Free constructions: `vacuum-cleaner`. MIT; licenses/hugeicons-MIT.txt.
- Adapted Hugeicons Free and Phosphor constructions: `hair-dryer`. MIT; both complete source notices in licenses/hair-dryer-sources.txt.


## Atlas 11-clothing

Individual comparisons and changes: `docs/review/atlas-craft-08/ledger.json`. Pinned source originals and checksums: `references/atlas-craft-08/manifest.json`.

- Adapted Lucide constructions: `shirt`, `glasses`. ISC; licenses/lucide.txt.
- Adapted Phosphor constructions: `trousers`, `dress`, `sock`, `watch`, `umbrella`. MIT; licenses/phosphor.txt.
- Adapted Tabler constructions: `shoe`, `sunglasses`. MIT; licenses/tabler.txt.
- Independent construction: `coat`.

Comparison only: unmodified OpenMoji 1F9E5 by OpenMoji contributors, CC BY-SA 4.0; https://github.com/hfg-gmuend/openmoji/blob/3e01de523ddefe9c5e46a7765b15efef04bf9002/black/svg/1F9E5.svg. Full terms: licenses/openmoji-CC-BY-SA-4.0.txt. This original is not Master product geometry.


## Atlas 12-medical

Individual comparisons and changes: `docs/review/atlas-craft-09/ledger.json`. Pinned source originals and checksums: `references/atlas-craft-09/manifest.json`.

- Adapted Lucide constructions: `stethoscope`, `pill`, `bandage`, `heart-pulse`. ISC; licenses/lucide.txt.
- Adapted Phosphor constructions: `syringe`, `medical-mask`, `thermometer`, `hospital`. MIT; licenses/phosphor.txt.
- Adapted Tabler constructions: `ambulance`, `first-aid-kit`. MIT; licenses/tabler.txt.


## Atlas 13-body

Individual comparisons and changes: `docs/review/atlas-craft-10/ledger.json`. Pinned source originals and checksums: `references/atlas-craft-10/manifest.json`.

- Adapted Lucide constructions: `bone`, `ear`, `person-standing`. ISC; licenses/lucide.txt.
- Adapted Tabler constructions: `tooth`, `brain`, `crutch`. MIT; licenses/tabler.txt.
- Adapted Phosphor constructions: `hand-heart`, `person-walking`. MIT; licenses/phosphor.txt.
- Adapted Hugeicons Free constructions: `wheelchair`. MIT; licenses/hugeicons-MIT.txt.
- Adapted Tabler and Hugeicons Free constructions: `lungs`. MIT; both complete source notices in licenses/lungs-sources.txt.

Comparison only: unmodified OpenMoji 1FA7C by OpenMoji contributors, CC BY-SA 4.0; https://github.com/hfg-gmuend/openmoji/blob/3e01de523ddefe9c5e46a7765b15efef04bf9002/black/svg/1FA7C.svg. Full terms: licenses/openmoji-CC-BY-SA-4.0.txt. This original is not Master product geometry.


## Atlas 14-sports

Individual comparisons and changes: `docs/review/atlas-craft-11/ledger.json`. Pinned source originals and checksums: `references/atlas-craft-11/manifest.json`.

- Adapted Hugeicons Free constructions: `dumbbell`, `kettlebell`, `tennis-racket`. MIT; licenses/hugeicons-MIT.txt.
- Adapted Phosphor constructions: `basketball`, `baseball`. MIT; licenses/phosphor.txt.
- Adapted Tabler constructions: `football`, `golf-hole`, `swimming`. MIT; licenses/tabler.txt.
- Adapted Lucide constructions: `volleyball`. ISC; licenses/lucide.txt.

## Brand silhouettes · brands-03

Adds 16 names with original source hashes and individual optical envelopes. Simple Icons references use pinned commits `17cd4ee07612198a1d8777a060d4100423762a8b` or historical v12.4.0 `32b07a5b798b84b97f2cbbb5b69ec7cb80472f73`. Historical AWS, Canva, Teams and Outlook silhouettes are recorded as such, not asserted to be current redesigns.

Source-specific artwork terms, attribution and license texts are retained in [brand-additions.txt](licenses/brand-additions.txt), distributed with the package and every ZIP. Vue artwork is CC-BY-NC-SA-4.0 with additional permissions from Evan You; JavaScript and GitHub Copilot retain their upstream MIT notices; Teams and Outlook retain Microsoft Fabric asset terms. These assets are not all covered by the Master code license or Simple Icons CC0 dedication.

Dcard uses a vector trace of the archived app icon from the linked Commons revision, whose metadata identifies Dcard as author. The original PNG, trace, hashes and measured trace fidelity are retained. Blue shades are unified, the long shadow omitted, and white becomes negative space. The official guide specifies a 48px minimum for app marks; the 16/20/24px exports are optical previews and do not claim compliance with that minimum. See [batch record](docs/brands-03.md).

| Export | Artwork / version | License / terms |
| --- | --- | --- |
| `brand-vue-js` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/vuedotjs.svg) | CC-BY-NC-SA-4.0 |
| `brand-javascript` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/javascript.svg) | MIT |
| `brand-bun` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/bun.svg) | CC0-1.0 |
| `brand-github-copilot` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/githubcopilot.svg) | MIT |
| `brand-hugging-face` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/huggingface.svg) | CC0-1.0 |
| `brand-aws` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/32b07a5b798b84b97f2cbbb5b69ec7cb80472f73/icons/amazonwebservices.svg) | CC0-1.0 |
| `brand-firebase` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/firebase.svg) | CC0-1.0 |
| `brand-postgresql` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/postgresql.svg) | CC0-1.0 |
| `brand-microsoft-teams` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/32b07a5b798b84b97f2cbbb5b69ec7cb80472f73/icons/microsoftteams.svg) | LicenseRef-Microsoft-Fabric-Assets |
| `brand-outlook` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/32b07a5b798b84b97f2cbbb5b69ec7cb80472f73/icons/microsoftoutlook.svg) | LicenseRef-Microsoft-Fabric-Assets |
| `brand-google-meet` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/googlemeet.svg) | CC0-1.0 |
| `brand-canva` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/32b07a5b798b84b97f2cbbb5b69ec7cb80472f73/icons/canva.svg) | CC0-1.0 |
| `brand-dribbble` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/dribbble.svg) | CC0-1.0 |
| `brand-wordpress` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/wordpress.svg) | CC0-1.0 |
| `brand-dcard` | [Dcard artwork via Wikimedia Commons](https://commons.wikimedia.org/w/index.php?title=File:Dcard_Favicon_x520.png&oldid=887105692) | LicenseRef-Dcard-Brand |
| `brand-shopee` | [Simple Icons](https://github.com/simple-icons/simple-icons/blob/17cd4ee07612198a1d8777a060d4100423762a8b/icons/shopee.svg) | CC0-1.0 |


## Atlas sports simplicity refinement

`football` retains its Tabler-derived central-pentagon construction (MIT; licenses/tabler.txt), with a small panel proportion adjustment. The intermediate Phosphor-style peripheral panels were rejected and are preserved only in review history. `tennis-racket` further adapts Hugeicons Free's open frame and sparse net indication (MIT; licenses/hugeicons-MIT.txt). Current evidence and preserved earlier decisions: `docs/review/atlas-craft-12/ledger.json`.


## Atlas 15-outdoor

Individual comparisons and changes: `docs/review/atlas-craft-13/ledger.json`. Pinned source originals and checksums: `references/atlas-craft-13/manifest.json`.

- Adapted Phosphor constructions: `binoculars`, `hiking`. MIT; licenses/phosphor.txt.
- Adapted Lucide constructions: `flashlight`, `axe`, `shovel`, `pickaxe`, `footprints`, `kayak`. ISC; licenses/lucide.txt.
- Adapted Hugeicons Free constructions: `fishing-hook`. MIT; licenses/hugeicons-MIT.txt.
- Adapted Tabler constructions: `campfire`. MIT; licenses/tabler.txt.


## Atlas 16-science

Individual comparisons and changes: `docs/review/atlas-craft-14/ledger.json`. Pinned source originals and checksums: `references/atlas-craft-14/manifest.json`.

- Adapted Lucide constructions: `atom`, `flask-conical`, `test-tube`, `satellite`. ISC; licenses/lucide.txt.
- Adapted Hugeicons Free constructions: `flask-round`, `orbit`. MIT; licenses/hugeicons-MIT.txt.
- Adapted Phosphor constructions: `microscope`, `rocket`. MIT; licenses/phosphor.txt.
- Adapted Tabler constructions: `telescope`, `dna`. MIT; licenses/tabler.txt.


## Atlas 17-math

Individual comparisons and changes: `docs/review/atlas-craft-15/ledger.json`. Pinned source originals and checksums: `references/atlas-craft-15/manifest.json`.

- Adapted Lucide constructions: `pi`, `infinity`, `radical`, `function-square`. ISC; licenses/lucide.txt.
- Adapted Tabler constructions: `sigma`, `fraction`. MIT; licenses/tabler.txt.
- Adapted Hugeicons Free constructions: `plus-minus`. MIT; licenses/hugeicons-MIT.txt.
- Independent construction: `equal`, `not-equal`, `divide`.


## Atlas 18-education

Individual comparisons and changes: `docs/review/atlas-craft-16/ledger.json`. Pinned source originals and checksums: `references/atlas-craft-16/manifest.json`.

- Adapted Lucide constructions: `graduation-cap`, `school`, `presentation`, `library`, `pencil-ruler`. ISC; licenses/lucide.txt.
- Adapted Phosphor constructions: `chalkboard`, `book-marked`, `diploma`, `globe-stand`. MIT; licenses/phosphor.txt.
- Adapted Tabler constructions: `abacus`. MIT; licenses/tabler.txt.


## Atlas 19-music

Individual comparisons and changes: `docs/review/atlas-craft-17/ledger.json`. Pinned source originals and checksums: `references/atlas-craft-17/manifest.json`.

- Adapted Lucide constructions: `guitar`, `piano`, `guitar-electric`, `music-keyboard`. ISC; licenses/lucide.txt.
- Adapted Lucide and Phosphor constructions: `vinyl-record`. ISC AND MIT; both complete notices in licenses/vinyl-record-sources.txt.
- Adapted Hugeicons Free constructions: `drum`. MIT; licenses/hugeicons-MIT.txt.
- Adapted Material Design Icons constructions: `violin`, `trumpet`, `saxophone`. Apache-2.0; licenses/mdi-music-adaptations.txt.
- Adapted Phosphor constructions: `metronome`. MIT; licenses/phosphor.txt.

Comparison only: unmodified OpenMoji 1F3BB by OpenMoji contributors, CC BY-SA 4.0; https://github.com/hfg-gmuend/openmoji/blob/3e01de523ddefe9c5e46a7765b15efef04bf9002/black/svg/1F3BB.svg. Full terms: licenses/openmoji-CC-BY-SA-4.0.txt. This original is not Master product geometry.

Comparison only: unmodified OpenMoji 1F3BA by OpenMoji contributors, CC BY-SA 4.0; https://github.com/hfg-gmuend/openmoji/blob/3e01de523ddefe9c5e46a7765b15efef04bf9002/black/svg/1F3BA.svg. Full terms: licenses/openmoji-CC-BY-SA-4.0.txt. This original is not Master product geometry.

Comparison only: unmodified OpenMoji 1F3B7 by OpenMoji contributors, CC BY-SA 4.0; https://github.com/hfg-gmuend/openmoji/blob/3e01de523ddefe9c5e46a7765b15efef04bf9002/black/svg/1F3B7.svg. Full terms: licenses/openmoji-CC-BY-SA-4.0.txt. This original is not Master product geometry.


## Atlas 20-media

Individual comparisons and changes: `docs/review/atlas-craft-18/ledger.json`. Pinned source originals and checksums: `references/atlas-craft-18/manifest.json`.

- Adapted Phosphor constructions: `radio-receiver`, `speaker`, `film-reel`. MIT; licenses/phosphor.txt.
- Adapted Lucide constructions: `tv`, `projector`, `cassette`, `film`, `clapperboard`. ISC; licenses/lucide.txt.
- Adapted Hugeicons Free constructions: `podcast`. MIT; licenses/hugeicons-MIT.txt.
- Adapted Tabler constructions: `antenna`. MIT; licenses/tabler.txt.


## Atlas 21-tools

Individual comparisons and changes: `docs/review/atlas-craft-19/ledger.json`. Pinned source originals and checksums: `references/atlas-craft-19/manifest.json`.

- Adapted Lucide constructions: `hammer`, `toolbox`, `hard-hat`, `paint-roller`. ISC; licenses/lucide.txt.
- Adapted Phosphor constructions: `screwdriver`, `nut`. MIT; licenses/phosphor.txt.
- Adapted Hugeicons Free constructions: `drill`, `tape-measure`, `pocket-knife`. MIT; licenses/hugeicons-MIT.txt.
- Adapted Material Design Icons constructions: `saw`. Apache-2.0; licenses/mdi-tool-adaptations.txt.

Comparison only: unmodified OpenMoji 1FA9A by OpenMoji contributors, CC BY-SA 4.0; https://github.com/hfg-gmuend/openmoji/blob/3e01de523ddefe9c5e46a7765b15efef04bf9002/black/svg/1FA9A.svg. Full terms: licenses/openmoji-CC-BY-SA-4.0.txt. This original is not Master product geometry.


## Atlas 22-industry

Individual comparisons and changes: `docs/review/atlas-craft-20/ledger.json`. Pinned source originals and checksums: `references/atlas-craft-20/manifest.json`.

- Adapted Lucide constructions: `factory`, `forklift`, `warehouse`, `container`, `robot-arm`, `construction-barrier`. ISC; licenses/lucide.txt.
- Adapted Phosphor constructions: `crane-tower`, `wall`. MIT; licenses/phosphor.txt.
- Adapted Hugeicons Free constructions: `crane-truck`. MIT; licenses/hugeicons-MIT.txt.
- Adapted Tabler constructions: `excavator`. MIT; licenses/tabler.txt.


## Atlas 23-energy

Individual comparisons and changes: `docs/review/atlas-craft-21/ledger.json`. Pinned source originals and checksums: `references/atlas-craft-21/manifest.json`.

- Adapted Phosphor constructions: `solar-panel`, `battery-warning`. MIT; licenses/phosphor.txt.
- Adapted Tabler constructions: `wind-turbine`, `power-socket`. MIT; licenses/tabler.txt.
- Adapted Lucide constructions: `battery-full`, `battery-low`, `battery-medium`, `car-battery`, `charging-station`. ISC; licenses/lucide.txt.
- Adapted Hugeicons Free constructions: `transmission-tower`. MIT; licenses/hugeicons-MIT.txt.


## Atlas 24-safety

Individual comparisons and changes: `docs/review/atlas-craft-22/ledger.json`. Pinned source originals and checksums: `references/atlas-craft-22/manifest.json`.

- Adapted Lucide constructions: `cctv`, `alarm-smoke`, `fire-extinguisher`, `vault`, `key-square`, `scan-face`. ISC; licenses/lucide.txt.
- Adapted Phosphor constructions: `siren`, `seat-belt`. MIT; licenses/phosphor.txt.
- Adapted Tabler constructions: `fire-hydrant`. MIT; licenses/tabler.txt.
- Adapted Lucide Lab constructions: `safety-pin`. ISC; licenses/lucide.txt.


## Atlas 25-commerce

Individual comparisons and changes: `docs/review/atlas-craft-23/ledger.json`. Pinned source originals and checksums: `references/atlas-craft-23/manifest.json`.

- Adapted Lucide constructions: `scale`, `gavel`, `stamp`, `shopping-basket`, `basket-check`, `basket-plus`. ISC; licenses/lucide.txt.
- Adapted Phosphor constructions: `cash-register`. MIT; licenses/phosphor.txt.
- Adapted Hugeicons Free constructions: `receipt-dollar`. MIT; licenses/hugeicons-MIT.txt.
- Independent construction: `bag-check`, `bag-plus`.


## Atlas 26-communications

Individual comparisons and changes: `docs/review/atlas-craft-24/ledger.json`. Pinned source originals and checksums: `references/atlas-craft-24/manifest.json`.

- Adapted Lucide constructions: `mailbox`, `satellite-dish`. ISC; licenses/lucide.txt.
- Independent construction: `phone-incoming`, `phone-outgoing`, `phone-missed`, `phone-call`, `message-heart`, `message-dots`, `message-lock`, `message-search`.


## Atlas 27-charts

Individual comparisons and changes: `docs/review/atlas-craft-25/ledger.json`. Pinned source originals and checksums: `references/atlas-craft-25/manifest.json`.

- Adapted Lucide constructions: `chart-radar`, `chart-candlestick`, `chart-network`, `chart-spline`, `chart-bell-curve`, `chart-combo`. ISC; licenses/lucide.txt.
- Adapted Hugeicons Free constructions: `chart-waterfall`. MIT; licenses/hugeicons-MIT.txt.
- Adapted Tabler constructions: `chart-bubble`, `chart-histogram`, `chart-sankey`. MIT; licenses/tabler.txt.


## Atlas 28-geometry

Individual comparisons and changes: `docs/review/atlas-craft-26/ledger.json`. Pinned source originals and checksums: `references/atlas-craft-26/manifest.json`.

- Adapted Tabler constructions: `vector-square`. MIT; licenses/tabler.txt.
- Adapted Phosphor constructions: `bezier-curve`. MIT; licenses/phosphor.txt.
- Adapted Lucide constructions: `spline`, `vector-polygon`, `cone`, `cylinder`, `pyramid`. ISC; licenses/lucide.txt.
- Independent construction: `pentagon`, `octagon`, `ellipse`.


## Atlas 29-layout

Individual comparisons and changes: `docs/review/atlas-craft-27/ledger.json`. Pinned source originals and checksums: `references/atlas-craft-27/manifest.json`.

- Adapted Lucide constructions: `layout-list`, `layout-template`, `layout-panel-left`, `picture-in-picture`, `panels-top-left`. ISC; licenses/lucide.txt.
- Adapted Phosphor constructions: `split-horizontal`, `split-vertical`. MIT; licenses/phosphor.txt.
- Independent construction: `panel-bottom-open`, `panel-top-open`, `focus`.


## Atlas 30-time

Individual comparisons and changes: `docs/review/atlas-craft-28/ledger.json`. Pinned source originals and checksums: `references/atlas-craft-28/manifest.json`.

- Adapted Lucide constructions: `hourglass`, `timer-reset`. ISC; licenses/lucide.txt.
- Adapted Tabler constructions: `calendar-recurring`. MIT; licenses/tabler.txt.
- Independent construction: `calendar-heart`, `calendar-lock`, `alarm-plus`, `alarm-minus`, `alarm-check`, `calendar-search`, `calendar-off`.


## Atlas 31-celebration

Individual comparisons and changes: `docs/review/atlas-craft-29/ledger.json`. Pinned source originals and checksums: `references/atlas-craft-29/manifest.json`.

- Adapted Lucide constructions: `diamond-gem`, `balloon`, `gamepad`, `joystick`. ISC; licenses/lucide.txt.
- Adapted Phosphor constructions: `crown`, `medal`. MIT; licenses/phosphor.txt.
- Adapted Tabler constructions: `trophy`, `ribbon`, `party-popper`. MIT; licenses/tabler.txt.
- Independent construction: `dice`.

## Atlas running refinement

The revised `running` develops Phosphor's curved arm swing and continuous stride while retaining the earlier Tabler-derived torso, head placement and overall proportions. Both sources are recorded in `packages/icons/src/atlas-provenance.json`; the earlier Tabler record is preserved as `baseSource`. Both complete MIT notices are included in `licenses/running-sources.txt`, embedded in the running SVGs and shipped in the core package and downloadable ZIPs.

- Tabler: `tabler/tabler-icons`, commit `4581ad20d8d13e24f6c3be75caaea1c4ad6c4b35`, `icons/outline/run.svg`; Copyright (c) 2020-2026 Paweł Kuna.
- Phosphor: `phosphor-icons/core`, commit `2b75f3ad12b420c9504ef05df8d2564a28f8500e`, `assets/regular/person-simple-run.svg`; Copyright (c) 2023 Phosphor Icons.

## Atlas vinyl record refinement

The revised `vinyl-record` develops Phosphor's opposing quarter-circle grooves while retaining the earlier Lucide-derived outer circle and center hole. The earlier Lucide record is preserved as `baseSource` in `packages/icons/src/atlas-provenance.json`. The combined license file `licenses/vinyl-record-sources.txt` contains the complete Lucide and Phosphor notices and is used for SVG metadata, package notices and downloadable ZIPs.

- Lucide: `lucide-icons/lucide`, commit `55782beff3a0133df79c417eb68f96e8f19e2404`, `icons/disc-3.svg`; Copyright (c) 2026 Lucide Icons and Contributors.
- Phosphor: `phosphor-icons/core`, commit `2b75f3ad12b420c9504ef05df8d2564a28f8500e`, `assets/regular/vinyl-record.svg`; Copyright (c) 2023 Phosphor Icons.
