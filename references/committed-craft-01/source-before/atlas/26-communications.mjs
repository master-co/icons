import {author} from './helpers.mjs';
import {mailbox,phoneIncoming,phoneOutgoing,phoneMissed,phoneCall,satelliteDish,messageHeart,messageDots,messageLock,messageSearch} from './communications-shapes.mjs';
export const batch=author([
 ['mailbox','信箱','mailbox','phosphor/mailbox','拱頂箱身、前方箱門與側面投遞旗',mailbox],
 ['phone-incoming','來電','phone-incoming','phone-incoming','電話聽筒與向內箭頭',phoneIncoming],
 ['phone-outgoing','撥出電話','phone-outgoing','phone-outgoing','電話聽筒與向外箭頭',phoneOutgoing],
 ['phone-missed','未接來電','phone-missed','hugeicons/phone-missed','電話聽筒與右上叉號',phoneMissed],
 ['phone-call','通話中','phone-call','phosphor/phone-call','電話聽筒與兩道通話聲波',phoneCall],
 ['satellite-dish','衛星天線','satellite-dish','hugeicons/satellite-dish','斜向碟面、饋源桿與接收波',satelliteDish],
 ['message-heart','喜愛訊息','tabler/message-heart','hugeicons/bubble-chat-favourite','訊息母型與內置愛心',messageHeart],
 ['message-dots','訊息輸入中','tabler/message-dots','phosphor/chat-dots','訊息母型與三個等待點',messageDots],
 ['message-lock','鎖定訊息','mdi/message-lock-outline','hugeicons/bubble-chat-lock','訊息母型與右下鎖頭',messageLock],
 ['message-search','搜尋訊息','tabler/message-search','hugeicons/bubble-chat-search','訊息母型與右下放大鏡',messageSearch],
], 'communication-tools','通訊與訊息');
