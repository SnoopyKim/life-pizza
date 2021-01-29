import { getOnlyNumbersFromObject } from './number';

export const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const isEmptyArray = (arr) => {
    return Array.isArray(arr) && arr.length === 0;
};

/*
 * 등수 계산
 * 0: 당첨 X / 1-5: 등수
 */
export const getWinResult = (result, history) => {
    const _result = getOnlyNumbersFromObject(result);
    const _history = getOnlyNumbersFromObject(history);
    const matchCount = Object.values(_history).filter((num) => Object.values(_result).includes(num)).length;
    const matchBonus = Object.values(_history).includes(result.bno);
    if (matchCount === 6) {
        return 1;
    }
    if (matchCount === 5) {
        return matchBonus ? 2 : 3;
    }
    if (matchCount === 4) {
        return 4;
    }
    if (matchCount === 3) {
        return 5;
    }
    return 0;
};
