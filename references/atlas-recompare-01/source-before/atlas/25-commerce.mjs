import {author} from './helpers.mjs';
import {scale,gavel,stamp,shoppingBasket,basketCheck,basketPlus,bagCheck,bagPlus,cashRegister,receiptDollar} from './commerce-shapes.mjs';
export const batch=author([
 ['scale','天秤','scale','phosphor/scales','中央支柱、平衡橫樑與左右秤盤',scale],
 ['gavel','法槌','gavel','phosphor/gavel','寬槌身、兩端槌面與斜向長柄',gavel],
 ['stamp','印章','stamp','phosphor/stamp','收腰握柄、印面底座與下方印痕',stamp],
 ['shopping-basket','購物籃','shopping-basket','phosphor/basket','雙斜提把、寬籃口與收窄籃身',shoppingBasket],
 ['basket-check','購物籃完成','tabler/basket-check','hugeicons/shopping-basket-done-03','購物籃母型與右下勾號',basketCheck],
 ['basket-plus','新增購物籃','tabler/basket-plus','hugeicons/shopping-basket-add-03','購物籃母型與右下加號',basketPlus],
 ['bag-check','購物袋完成','tabler/shopping-bag-check','hugeicons/shopping-bag-check','既有購物袋母型與完成勾號',bagCheck],
 ['bag-plus','新增購物袋','tabler/shopping-bag-plus','hugeicons/shopping-bag-add','既有購物袋母型與新增符號',bagPlus],
 ['cash-register','收銀機','tabler/cash-register','phosphor/cash-register','傾斜鍵盤、頂部顯示器與底層錢櫃',cashRegister],
 ['receipt-dollar','金額收據','tabler/receipt-dollar','hugeicons/receipt-dollar','鋸齒收據母型與貨幣金額符號',receiptDollar],
], 'commerce-tools','交易與商務');
