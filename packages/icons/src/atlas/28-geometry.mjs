import {author} from './helpers.mjs';
import {vectorSquare,bezierCurve,spline,vectorPolygon,pentagon,octagon,ellipse,cone,cylinder,pyramid} from './geometric-shapes.mjs';
export const batch=author([
 ['vector-square','方形向量路徑','vector-square','vector','方形路徑與四角控制節點',vectorSquare],
 ['bezier-curve','貝茲曲線','phosphor/bezier-curve','vector-bezier','拱形曲線、三個節點與水平控制桿',bezierCurve],
 ['spline','曲線路徑','spline','vector-spline','連續曲線及兩端控制節點',spline],
 ['vector-polygon','多邊形向量路徑','vector-polygon','polygon','不規則閉合路徑與四個控制節點',vectorPolygon],
 ['pentagon','五邊形','pentagon','phosphor/pentagon','五條等長邊與上方頂點',pentagon],
 ['octagon','八邊形','octagon','phosphor/octagon','八條等長邊及對稱切角',octagon],
 ['ellipse','橢圓形','ellipse','hugeicons/ellipse','水平長軸與連續橢圓曲面',ellipse],
 ['cone','圓錐','cone','cone','單一頂點、相切側壁與橢圓底面',cone],
 ['cylinder','圓柱','cylinder','cylinder','橢圓頂面、平行側壁與下方弧底',cylinder],
 ['pyramid','角錐','pyramid','pyramid','頂點、兩個三角面與中央稜線',pyramid],
], 'geometry-tools','幾何與向量');
