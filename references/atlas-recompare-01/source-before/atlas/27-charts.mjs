import {author} from './helpers.mjs';
import {chartRadar,chartCandlestick,chartWaterfall,chartBubble,chartNetwork,chartHistogram,chartSankey,chartSpline,chartBellCurve,chartCombo} from './chart-shapes.mjs';
export const batch=author([
 ['chart-radar','雷達圖','chart-radar','chart-radar','五向放射軸與不等值資料多邊形',chartRadar],
 ['chart-candlestick','K 線圖','chart-candlestick','chart-candle','不同高度的燭身、上下影線及座標軸',chartCandlestick],
 ['chart-waterfall','瀑布圖','mdi/chart-waterfall','hugeicons/waterfall-down-01','沿水平進程累加或扣減的懸空資料柱',chartWaterfall],
 ['chart-bubble','氣泡圖','tabler/chart-bubble','hugeicons/chart-bubble-01','大小不一且分散配置的氣泡',chartBubble],
 ['chart-network','網路圖','chart-network','hugeicons/chart-network','座標圖中的相連節點及分支',chartNetwork],
 ['chart-histogram','分布直方圖','tabler/chart-histogram','hugeicons/chart-histogram','高低資料柱與上方分布曲線',chartHistogram],
 ['chart-sankey','桑基圖','tabler/chart-sankey','mdi/chart-sankey','多道流向曲線的分流與交織',chartSankey],
 ['chart-spline','平滑曲線圖','chart-spline','hugeicons/chart-spline','具有峰谷的平滑資料曲線與座標軸',chartSpline],
 ['chart-bell-curve','鐘形曲線圖','chart-bell-curve','mdi/chart-bell-curve','對稱單峰分布曲線及座標軸',chartBellCurve],
 ['chart-combo','組合圖','chart-no-axes-combined','hugeicons/chart-bar-line','同時呈現折線及直柱資料',chartCombo],
], 'chart-types','資料圖表');
