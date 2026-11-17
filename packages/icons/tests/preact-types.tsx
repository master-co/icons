/** @jsxImportSource preact */
import { createRef } from 'preact';
import { SearchIcon } from '@master/icons-preact';
import { SearchIcon as Fixed } from '@master/icons-preact/16/soft';
<SearchIcon size={20} corner="rounded" ref={createRef<SVGSVGElement>()} onClick={event => event.preventDefault()} />;
<Fixed size={32} class="icon" />;
// @ts-expect-error fixed optical size
<Fixed opticalSize={24} />;
// @ts-expect-error numeric sizes only
<SearchIcon size="1em" />;

<SearchIcon strokeWidth={2} />;
