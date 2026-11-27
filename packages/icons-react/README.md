# @master/icons-react

Master Icons components for React: optically sized interface icons with 16, 20 and 24 px drawings and sharp, soft and rounded corners.

Documentation and the full collection: [icons.master.co](https://icons.master.co/guide/react).

This package contains only the React adapter. It depends on the matching `@master/icons` core for shared geometry and requires `react` as its only framework peer. It does not install the other icon adapters.

```sh
npm install @master/icons-react
```

The matching `@master/icons` core is installed with it.

```js
import { SearchIcon } from '@master/icons-react';
import { SearchIcon as SmallSearch } from '@master/icons-react/16/soft';
```

Dynamic components select among 16, 20 and 24 px optical sizes and sharp, soft and rounded corners. Fixed imports contain one optical size and corner with its supported stroke widths, and still accept a display `size`. Both entries accept numeric `strokeWidth` in 0.25 increments to select precomputed stroke geometry. Unused icons can be tree-shaken. Direct component imports are also available at `@master/icons-react/icons/search` and `@master/icons-react/16/soft/search`.

For one original drawing at its native stroke width, import the component by default:

```js
import SearchIcon from '@master/icons-react/native/16/soft/search';
```

Native entries support all sizes and corners. Choose a dynamic or fixed entry to use `strokeWidth`.

See the [usage guide](https://icons.master.co/guide/react) and the [core README](https://github.com/master-co/icons/tree/main/packages/icons#readme) for props, accessibility, direction and framework examples. Geometry and its applicable artwork notices are supplied by `@master/icons`; code is MIT licensed.

Sources are in the [master-co/icons](https://github.com/master-co/icons) repository; `dist/` is generated.

## Artwork credits

Master and contributors draw the original interface icons. Adapted drawings credit Lucide Icons and Contributors, the Feather project (Cole Bemis), Phosphor Icons, Paweł Kuna (Tabler), Hugeicons, Luca Burgio (Iconoir), Microsoft (Fluent), the Bootstrap Authors, OpenMoji contributors and Material Design Icons contributors including Google and Michael Irigoyen.

Brand artwork includes the OpenAI Blossom used for OpenAI and ChatGPT, Microsoft Teams and Outlook by Microsoft, the Dcard app mark by Dcard, Vue.js by Evan You, HTML5 by W3C, JavaScript by Christopher Williams and GitHub Copilot by GitHub. Brand contours also come from Simple Icons, with outline drawings adapted from Tabler and Tencent TDesign. The brand owners retain their rights.

The bundled [third-party notices](./THIRD_PARTY_NOTICES.md) identify individual drawings, modifications and terms. Full license texts accompany the artwork in `licenses/`. When distributing a standalone SVG, preserve the notices it carries.

<!-- Generated artwork notices -->

Each notice applies to the listed drawings at every size, corner and stroke width. Include the applicable notices when redistributing individual files.

`arrow-right`, `bell`, `calendar`, `chart-waterfall`, `check`, `crane-truck`, `drill`, `drum`, `dumbbell`, `file-text`, `fishing-hook`, `flask-round`, `folder`, `hair-dryer`, `heart`, `home`, `hotspot`, `incognito`, `kettlebell`, `lungs`, `milk`, `mushroom`, `orbit`, `plus-minus`, `pocket-knife`, `podcast`, `receipt-dollar`, `screen-rotate`, `search`, `settings`, `star`, `tape-measure`, `tennis-racket`, `transmission-tower`, `user`, `vacuum-cleaner`, `wheelchair`

```text
MIT License

Copyright (c) 2025 Hugeicons

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

`alarm-smoke`, `apple-fruit`, `armchair`, `atom`, `axe`, `backpack`, `balloon`, `bandage`, `basket-check`, `basket-plus`, `battery-full`, `battery-low`, `battery-medium`, `bed`, `beer`, `bird`, `bone`, `boolean-exclude`, `bus`, `car-battery`, `carrot`, `cassette`, `cat`, `cctv`, `charging-station`, `chart-bell-curve`, `chart-candlestick`, `chart-combo`, `chart-network`, `chart-radar`, `chart-spline`, `clapperboard`, `cloud-fog`, `cloud-lightning`, `cloud-moon`, `cloud-rain`, `cloud-snow`, `cloud-sun`, `coffee`, `cone`, `construction-barrier`, `container`, `cookie`, `cooking-pot`, `cup-soda`, `cylinder`, `decimal-decrease`, `decimal-increase`, `diamond-gem`, `dog`, `door-closed`, `door-open`, `drop-cap`, `ear`, `factory`, `film`, `fire-extinguisher`, `flashlight`, `flask-conical`, `footprints`, `forklift`, `fuel`, `function-square`, `gamepad`, `gavel`, `glasses`, `graduation-cap`, `group`, `guitar`, `guitar-electric`, `hammer`, `handshake`, `hard-hat`, `heart-pulse`, `heater`, `helicopter`, `hourglass`, `ice-cream`, `infinity`, `joystick`, `kayak`, `key-square`, `layers`, `layout-list`, `layout-panel-left`, `layout-template`, `leaf`, `letter-spacing`, `library`, `line-height`, `mailbox`, `megaphone`, `microwave`, `mountain`, `mountain-snow`, `music-keyboard`, `paint-roller`, `panels-top-left`, `pencil-ruler`, `person-standing`, `pi`, `piano`, `pickaxe`, `picture-in-picture`, `pill`, `presentation`, `projector`, `pyramid`, `radical`, `replace`, `replace-all`, `robot-arm`, `safety-pin`, `sailboat`, `salad`, `sandwich`, `satellite`, `satellite-dish`, `scale`, `scan-face`, `school`, `ship`, `shirt`, `shopping-basket`, `shovel`, `shower-head`, `sofa`, `spline`, `sprout`, `stamp`, `stethoscope`, `stroke-cap-butt`, `stroke-cap-round`, `stroke-cap-square`, `stroke-join-bevel`, `stroke-join-miter`, `stroke-join-round`, `sunrise`, `sunset`, `tent`, `test-tube`, `timer-reset`, `toolbox`, `tree-pine`, `turtle`, `tv`, `ungroup`, `utensils`, `vault`, `vector-polygon`, `vinyl-record`, `volleyball`, `warehouse`, `washing-machine`, `wheat`, `wind`

```text
ISC License

Copyright (c) 2026 Lucide Icons and Contributors

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```

`abacus`, `ambulance`, `anchor`, `antenna`, `banana`, `bell-snooze`, `border-all`, `border-horizontal`, `border-inner`, `border-none`, `border-outer`, `border-vertical`, `bottle`, `brain`, `brand-facebook-outline`, `brand-github-outline`, `brand-linkedin-outline`, `brand-mastodon-outline`, `brand-patreon-outline`, `brand-pinterest-outline`, `brand-reddit-outline`, `brand-soundcloud-outline`, `brand-tiktok-outline`, `brand-twitch-outline`, `brand-vimeo-outline`, `brand-youtube-outline`, `bread`, `burger`, `cactus`, `cake`, `calendar-recurring`, `campfire`, `car`, `caravan`, `chart-bubble`, `chart-histogram`, `chart-sankey`, `cherry`, `contract`, `corner-radius`, `crutch`, `dna`, `excavator`, `fence`, `fire-hydrant`, `first-aid-kit`, `fish`, `flip-horizontal`, `flip-vertical`, `football`, `fraction`, `golf-hole`, `grape`, `hand-click`, `image-inline`, `image-wrap-left`, `image-wrap-right`, `iron`, `lungs`, `mushroom`, `page-break`, `party-popper`, `paw-print`, `pizza`, `power-socket`, `refrigerator`, `ribbon`, `road`, `running`, `shoe`, `sigma`, `signal-bars`, `signature`, `snail`, `soup`, `stroke-dashed`, `stroke-dotted`, `sunglasses`, `swimming`, `telescope`, `text-direction-ltr`, `text-direction-rtl`, `tooth`, `traffic-cone`, `trophy`, `vector-square`, `wind-turbine`

```text
MIT License

Copyright (c) 2020-2026 Paweł Kuna

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

`baseball`, `basketball`, `bathtub`, `battery-warning`, `bezier-curve`, `bicycle`, `binoculars`, `book-marked`, `butterfly`, `cactus`, `cash-register`, `chalkboard`, `citrus`, `crane-tower`, `crown`, `desk`, `diploma`, `dress`, `fan`, `film-reel`, `globe-stand`, `hair-dryer`, `hand-heart`, `hiking`, `hospital`, `lamp`, `medal`, `medical-mask`, `metronome`, `microscope`, `motorcycle`, `node-corner`, `nut`, `oven`, `person-walking`, `polyline`, `rabbit`, `radio-receiver`, `rocket`, `running`, `scooter`, `screwdriver`, `seat-belt`, `selection-invert`, `siren`, `sock`, `solar-panel`, `speaker`, `split-horizontal`, `split-vertical`, `syringe`, `thermometer`, `traffic-light`, `tram`, `trousers`, `umbrella`, `vinyl-record`, `wall`, `watch`, `wine`

```text
MIT License

Copyright (c) 2023 Phosphor Icons

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

`teapot`

```text
Teapot by OpenMoji contributors. https://github.com/hfg-gmuend/openmoji/blob/3e01de523ddefe9c5e46a7765b15efef04bf9002/black/svg/1FAD6.svg
Master adapted the lid and redrew the spout, handle and optical sizes. This artwork and its modifications are licensed under CC BY-SA 4.0. https://creativecommons.org/licenses/by-sa/4.0/
```

`air-conditioner`, `border-bottom`, `border-left`, `border-right`, `border-top`, `glass-water`

```text
MIT License

Copyright (c) 2021 Luca Burgio

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

`violin`

```text
violin: Google
https://github.com/Templarian/MaterialDesign/blob/2424e748e0cc63ab7b9c095a099b9fe239b737c0/svg/violin.svg
Modified by Master Icons.
```

`saw`, `saxophone`, `trumpet`, `violin`

```text
Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/

   TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

   1. Definitions.

      "License" shall mean the terms and conditions for use, reproduction,
      and distribution as defined by Sections 1 through 9 of this document.

      "Licensor" shall mean the copyright owner or entity authorized by
      the copyright owner that is granting the License.

      "Legal Entity" shall mean the union of the acting entity and all
      other entities that control, are controlled by, or are under common
      control with that entity. For the purposes of this definition,
      "control" means (i) the power, direct or indirect, to cause the
      direction or management of such entity, whether by contract or
      otherwise, or (ii) ownership of fifty percent (50%) or more of the
      outstanding shares, or (iii) beneficial ownership of such entity.

      "You" (or "Your") shall mean an individual or Legal Entity
      exercising permissions granted by this License.

      "Source" form shall mean the preferred form for making modifications,
      including but not limited to software source code, documentation
      source, and configuration files.

      "Object" form shall mean any form resulting from mechanical
      transformation or translation of a Source form, including but
      not limited to compiled object code, generated documentation,
      and conversions to other media types.

      "Work" shall mean the work of authorship, whether in Source or
      Object form, made available under the License, as indicated by a
      copyright notice that is included in or attached to the work
      (an example is provided in the Appendix below).

      "Derivative Works" shall mean any work, whether in Source or Object
      form, that is based on (or derived from) the Work and for which the
      editorial revisions, annotations, elaborations, or other modifications
      represent, as a whole, an original work of authorship. For the purposes
      of this License, Derivative Works shall not include works that remain
      separable from, or merely link (or bind by name) to the interfaces of,
      the Work and Derivative Works thereof.

      "Contribution" shall mean any work of authorship, including
      the original version of the Work and any modifications or additions
      to that Work or Derivative Works thereof, that is intentionally
      submitted to Licensor for inclusion in the Work by the copyright owner
      or by an individual or Legal Entity authorized to submit on behalf of
      the copyright owner. For the purposes of this definition, "submitted"
      means any form of electronic, verbal, or written communication sent
      to the Licensor or its representatives, including but not limited to
      communication on electronic mailing lists, source code control systems,
      and issue tracking systems that are managed by, or on behalf of, the
      Licensor for the purpose of discussing and improving the Work, but
      excluding communication that is conspicuously marked or otherwise
      designated in writing by the copyright owner as "Not a Contribution."

      "Contributor" shall mean Licensor and any individual or Legal Entity
      on behalf of whom a Contribution has been received by Licensor and
      subsequently incorporated within the Work.

   2. Grant of Copyright License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      copyright license to reproduce, prepare Derivative Works of,
      publicly display, publicly perform, sublicense, and distribute the
      Work and such Derivative Works in Source or Object form.

   3. Grant of Patent License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      (except as stated in this section) patent license to make, have made,
      use, offer to sell, sell, import, and otherwise transfer the Work,
      where such license applies only to those patent claims licensable
      by such Contributor that are necessarily infringed by their
      Contribution(s) alone or by combination of their Contribution(s)
      with the Work to which such Contribution(s) was submitted. If You
      institute patent litigation against any entity (including a
      cross-claim or counterclaim in a lawsuit) alleging that the Work
      or a Contribution incorporated within the Work constitutes direct
      or contributory patent infringement, then any patent licenses
      granted to You under this License for that Work shall terminate
      as of the date such litigation is filed.

   4. Redistribution. You may reproduce and distribute copies of the
      Work or Derivative Works thereof in any medium, with or without
      modifications, and in Source or Object form, provided that You
      meet the following conditions:

      (a) You must give any other recipients of the Work or
          Derivative Works a copy of this License; and

      (b) You must cause any modified files to carry prominent notices
          stating that You changed the files; and

      (c) You must retain, in the Source form of any Derivative Works
          that You distribute, all copyright, patent, trademark, and
          attribution notices from the Source form of the Work,
          excluding those notices that do not pertain to any part of
          the Derivative Works; and

      (d) If the Work includes a "NOTICE" text file as part of its
          distribution, then any Derivative Works that You distribute must
          include a readable copy of the attribution notices contained
          within such NOTICE file, excluding those notices that do not
          pertain to any part of the Derivative Works, in at least one
          of the following places: within a NOTICE text file distributed
          as part of the Derivative Works; within the Source form or
          documentation, if provided along with the Derivative Works; or,
          within a display generated by the Derivative Works, if and
          wherever such third-party notices normally appear. The contents
          of the NOTICE file are for informational purposes only and
          do not modify the License. You may add Your own attribution
          notices within Derivative Works that You distribute, alongside
          or as an addendum to the NOTICE text from the Work, provided
          that such additional attribution notices cannot be construed
          as modifying the License.

      You may add Your own copyright statement to Your modifications and
      may provide additional or different license terms and conditions
      for use, reproduction, or distribution of Your modifications, or
      for any such Derivative Works as a whole, provided Your use,
      reproduction, and distribution of the Work otherwise complies with
      the conditions stated in this License.

   5. Submission of Contributions. Unless You explicitly state otherwise,
      any Contribution intentionally submitted for inclusion in the Work
      by You to the Licensor shall be under the terms and conditions of
      this License, without any additional terms or conditions.
      Notwithstanding the above, nothing herein shall supersede or modify
      the terms of any separate license agreement you may have executed
      with Licensor regarding such Contributions.

   6. Trademarks. This License does not grant permission to use the trade
      names, trademarks, service marks, or product names of the Licensor,
      except as required for reasonable and customary use in describing the
      origin of the Work and reproducing the content of the NOTICE file.

   7. Disclaimer of Warranty. Unless required by applicable law or
      agreed to in writing, Licensor provides the Work (and each
      Contributor provides its Contributions) on an "AS IS" BASIS,
      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
      implied, including, without limitation, any warranties or conditions
      of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
      PARTICULAR PURPOSE. You are solely responsible for determining the
      appropriateness of using or redistributing the Work and assume any
      risks associated with Your exercise of permissions under this License.

   8. Limitation of Liability. In no event and under no legal theory,
      whether in tort (including negligence), contract, or otherwise,
      unless required by applicable law (such as deliberate and grossly
      negligent acts) or agreed to in writing, shall any Contributor be
      liable to You for damages, including any direct, indirect, special,
      incidental, or consequential damages of any character arising as a
      result of this License or out of the use or inability to use the
      Work (including but not limited to damages for loss of goodwill,
      work stoppage, computer failure or malfunction, or any and all
      other commercial damages or losses), even if such Contributor
      has been advised of the possibility of such damages.

   9. Accepting Warranty or Additional Liability. While redistributing
      the Work or Derivative Works thereof, You may choose to offer,
      and charge a fee for, acceptance of support, warranty, indemnity,
      or other liability obligations and/or rights consistent with this
      License. However, in accepting such obligations, You may act only
      on Your own behalf and on Your sole responsibility, not on behalf
      of any other Contributor, and only if You agree to indemnify,
      defend, and hold each Contributor harmless for any liability
      incurred by, or claims asserted against, such Contributor by reason
      of your accepting any such warranty or additional liability.

   END OF TERMS AND CONDITIONS

   APPENDIX: How to apply the Apache License to your work.

      To apply the Apache License to your work, attach the following
      boilerplate notice, with the fields enclosed by brackets "[]"
      replaced with your own identifying information. (Don't include
      the brackets!)  The text should be enclosed in the appropriate
      comment syntax for the file format. We also recommend that a
      file or class name and description of purpose be included on the
      same "printed page" as the copyright notice for easier
      identification within third-party archives.

   Copyright [yyyy] [name of copyright owner]

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
```

`trumpet`

```text
trumpet: Michael Irigoyen
https://github.com/Templarian/MaterialDesign/blob/2424e748e0cc63ab7b9c095a099b9fe239b737c0/svg/trumpet.svg
Modified by Master Icons.
```

`saxophone`

```text
saxophone: Google
https://github.com/Templarian/MaterialDesign/blob/2424e748e0cc63ab7b9c095a099b9fe239b737c0/svg/saxophone.svg
Modified by Master Icons.
```

`tv`

```text
The MIT License (MIT)

Copyright (c) 2013-present Cole Bemis

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

`saw`

```text
hand-saw: Michael Irigoyen
https://github.com/Templarian/MaterialDesign/blob/2424e748e0cc63ab7b9c095a099b9fe239b737c0/svg/hand-saw.svg
Modified by Master Icons.
```

`footnote`

```text
MIT License

Copyright (c) 2020 Microsoft Corporation

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

`stroke-width`

```text
The MIT License (MIT)

Copyright (c) 2019-2024 The Bootstrap Authors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

`brand-master`

```text
Master brand. Master. MIT.
```

`brand-anthropic`, `brand-apple`, `brand-asana`, `brand-astro`, `brand-aws`, `brand-bitbucket`, `brand-bluesky`, `brand-bun`, `brand-canva`, `brand-claude`, `brand-cloudflare`, `brand-cursor`, `brand-discord`, `brand-docker`, `brand-dribbble`, `brand-dropbox`, `brand-epic-games`, `brand-facebook`, `brand-figma`, `brand-firebase`, `brand-framer`, `brand-github`, `brand-gitlab`, `brand-gmail`, `brand-go`, `brand-google`, `brand-google-drive`, `brand-google-gemini`, `brand-google-meet`, `brand-hugging-face`, `brand-instagram`, `brand-ko-fi`, `brand-kubernetes`, `brand-line`, `brand-linear`, `brand-linkedin`, `brand-mastodon`, `brand-microsoft`, `brand-netlify`, `brand-next-js`, `brand-node-js`, `brand-notion`, `brand-npm`, `brand-nuxt`, `brand-patreon`, `brand-paypal`, `brand-perplexity`, `brand-pinterest`, `brand-postgresql`, `brand-python`, `brand-react`, `brand-reddit`, `brand-shopee`, `brand-shopify`, `brand-signal`, `brand-sketch`, `brand-slack`, `brand-snapchat`, `brand-soundcloud`, `brand-spotify`, `brand-steam`, `brand-stripe`, `brand-supabase`, `brand-svelte`, `brand-telegram`, `brand-threads`, `brand-tiktok`, `brand-trello`, `brand-twitch`, `brand-typescript`, `brand-vercel`, `brand-vimeo`, `brand-vite`, `brand-wechat`, `brand-whatsapp`, `brand-wordpress`, `brand-x`, `brand-youtube`, `brand-zoom`

```text
Simple Icons. Simple Icons contributors; respective brand owners. CC0-1.0.
```

`brand-chatgpt`, `brand-openai`

```text
OpenAI Blossom artwork by OpenAI. Master adapted the mark to monochrome and adjusted its optical placement. Brand guidelines and usage terms: https://openai.com/brand/
```

`brand-vue-js`

```text
Vue.js logo by Evan You. Master adapted the mark to monochrome and adjusted its optical placement. CC BY-NC-SA 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/) with additional permissions: https://github.com/vuejs/art#readme
```

`brand-javascript`

```text
The MIT License (MIT)

Copyright (c) 2011 Christopher Williams <chris@iterativedesigns.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

`brand-github-copilot`

```text
MIT License

Copyright (c) 2026 GitHub Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

`brand-microsoft-teams`

```text
Microsoft Teams artwork by Microsoft. Monochrome and optical placement by Master. Microsoft Fabric Assets License Agreement: https://aka.ms/fluentui-assets-license
```

`brand-outlook`

```text
Outlook artwork by Microsoft. Monochrome and optical placement by Master. Microsoft Fabric Assets License Agreement: https://aka.ms/fluentui-assets-license
```

`brand-dcard`

```text
Dcard app mark by Dcard, traced from the archived 2021 artwork by Master. https://commons.wikimedia.org/w/index.php?title=File:Dcard_Favicon_x520.png&oldid=887105692
Brand guidelines: https://www.dcard.tw/brand/dcard_brand_guidelines.pdf
```

`brand-html5`

```text
HTML5 Logo by W3C (https://www.w3.org/). Licensed under Creative Commons Attribution 3.0 Unported: https://creativecommons.org/licenses/by/3.0/. Modified by Master: wordmark and tonal overlays omitted; shield paths joined into one monochrome silhouette, uniformly scaled and centered. No affiliation or endorsement is implied.
```

`brand-wechat-outline`

```text
MIT License

Copyright (c) 2021-present TDesign

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

`brand-discord-outline`, `brand-gitlab-outline`, `brand-line-outline`, `brand-spotify-outline`, `brand-telegram-outline`

```text
Master Icons, based on Simple Icons. Simple Icons contributors; Master and contributors; respective brand owners. MIT.
```
<!-- End generated artwork notices -->
