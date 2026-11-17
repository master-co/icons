import {author} from './helpers.mjs';
import {layoutList,layoutTemplate,layoutPanelLeft,splitHorizontal,splitVertical,pictureInPicture,panelsTopLeft,panelBottomOpen,panelTopOpen,focus} from './layout-shapes.mjs';
export const batch=author([
 ['layout-list','縮圖清單','layout-list','hugeicons/layout-list','兩列縮圖與成組文字短線',layoutList],
 ['layout-template','版面範本','layout-template','hugeicons/layout-template','橫幅與下方兩個不同寬度區塊',layoutTemplate],
 ['layout-panel-left','左側分欄版面','layout-panel-left','hugeicons/layout-panel-left','左側長欄與右側兩個獨立區塊',layoutPanelLeft],
 ['split-horizontal','水平拆分','phosphor/split-horizontal','mdi/arrow-split-vertical','兩條垂直分界與左右向外箭頭',splitHorizontal],
 ['split-vertical','垂直拆分','phosphor/split-vertical','mdi/arrow-split-horizontal','兩條水平分界與上下向外箭頭',splitVertical],
 ['picture-in-picture','子母畫面','picture-in-picture-2','phosphor/picture-in-picture','主視窗與右下獨立小視窗',pictureInPicture],
 ['panels-top-left','上方與左側面板','panels-top-left','hugeicons/panels-top-left','共同視窗內的上欄、左欄與主區域',panelsTopLeft],
 ['panel-bottom-open','展開底部面板','panel-bottom-open','tabler/layout-bottombar-expand','底部面板母型與向上展開箭翼',panelBottomOpen],
 ['panel-top-open','展開頂部面板','panel-top-open','tabler/layout-navbar-expand','頂部面板母型與向下展開箭翼',panelTopOpen],
 ['focus','對焦','focus','tabler/focus-centered','四個開放框角與中央對焦圈',focus],
], 'layout-tools','版面與視窗');
