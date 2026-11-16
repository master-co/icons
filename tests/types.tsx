import { createRef } from 'react';
import { Search, renderSvg } from '@master/icons';
import { SearchIcon, TicketIcon, DashboardIcon, FolderSearchIcon, KanbanIcon } from '@master/icons/react';
import { SearchIcon as StaticSearch } from '@master/icons/react/16/soft';
renderSvg(Search,{size:18,corner:'soft',opticalSize:'auto',label:'搜尋'});
<SearchIcon size={20} corner="rounded" ref={createRef<SVGSVGElement>()} aria-label="搜尋" />;
<StaticSearch size={16} className="icon" />;
<TicketIcon size={16} corner="rounded" label="票券" />;
<DashboardIcon direction="rtl" strokeOpacity={0.6} />;
// @ts-expect-error continuous radius is intentionally unsupported
<SearchIcon corner={0.5} />;
// @ts-expect-error native masters are limited to the reviewed sizes
<SearchIcon opticalSize={18} />;
// @ts-expect-error static export has a fixed corner
<StaticSearch corner="sharp" />;
// @ts-expect-error numeric sizes only
<SearchIcon size="1em" />;

<FolderSearchIcon size={16} label="搜尋資料夾" />;
<KanbanIcon corner="rounded" />;
