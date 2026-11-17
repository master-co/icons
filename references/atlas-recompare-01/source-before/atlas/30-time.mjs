import {author} from './helpers.mjs';
import {hourglass,calendarHeart,calendarLock,calendarRecurring,alarmPlus,alarmMinus,alarmCheck,timerReset,calendarSearch,calendarOff} from './time-shapes.mjs';
export const batch=author([
 ['hourglass','沙漏','hourglass','hourglass','上下容器經細腰連為一體',hourglass],
 ['calendar-heart','重要日期','calendar-heart','calendar-heart','日曆母型與心形徽標',calendarHeart],
 ['calendar-lock','鎖定日曆','mdi/calendar-lock-outline','hugeicons/calendar-lock-01','日曆母型與封閉鎖頭',calendarLock],
 ['calendar-recurring','重複行程','calendar-sync','calendar-repeat','日曆母型與循環箭頭',calendarRecurring],
 ['alarm-plus','新增鬧鐘','alarm-clock-plus','alarm-plus','鬧鐘外殼與中央加號',alarmPlus],
 ['alarm-minus','減少鬧鐘','alarm-clock-minus','alarm-minus','鬧鐘外殼與中央減號',alarmMinus],
 ['alarm-check','鬧鐘已設定','alarm-clock-check','hugeicons/alarm-clock-check','鬧鐘外殼與中央勾號',alarmCheck],
 ['timer-reset','重設計時','timer-reset','hugeicons/timer-reset','計時旋鈕與回轉箭頭',timerReset],
 ['calendar-search','搜尋日曆','calendar-search','calendar-search','日曆母型與放大鏡',calendarSearch],
 ['calendar-off','停用日曆','calendar-off','calendar-off','日曆母型與斜刪線',calendarOff],
], 'time-tools','時間與日曆');
