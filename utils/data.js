import { getCurrentRound } from './../modules/api';
import { getFormattedDate } from './date';

export const dataToModel = (raw) => ({
    round: raw.round,
    date: raw.date,
    numbers: {
        no1: raw.no1,
        no2: raw.no2,
        no3: raw.no3,
        no4: raw.no4,
        no5: raw.no5,
        no6: raw.no6,
        bno: raw.bno,
    },
    firstWinCnt: raw.firstWinCnt,
    firstWinPrc: raw.firstWinPrc,
    secondWinCnt: raw.secondWinCnt,
    secondWinPrc: raw.secondWinPrc,
    thirdWinCnt: raw.thirdWinCnt,
    thirdWinPrc: raw.thirdWinPrc,
    fourthWinCnt: raw.fourthWinCnt,
    fourthWinPrc: raw.fourthWinPrc,
    fifthWinCnt: raw.fifthWinCnt,
    fifthWinPrc: raw.fifthWinPrc,
});

export const numberToModel = (numbers) => ({
    round: getCurrentRound() + 1,
    date: getFormattedDate(new Date()),
    no1: numbers[0],
    no2: numbers[1],
    no3: numbers[2],
    no4: numbers[3],
    no5: numbers[4],
    no6: numbers[5],
});
