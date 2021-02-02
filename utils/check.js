import { getOnlyNumbersFromObject } from './number';

export const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const isEmptyArray = (arr) => {
    return Array.isArray(arr) && arr.length === 0;
};

export const getMatchedNumberArray = (arr1 = {}, arr2 = {}) => {
    const _result = getOnlyNumbersFromObject(arr1);
    const _history = getOnlyNumbersFromObject(arr2);
    const matchedArray = Object.values(_history).filter((num) =>
        Object.values(_result).includes(num)
    );
    if (Object.values(_history).includes(arr1.bno)) {
        matchedArray.push(arr1.bno);
    }
    return matchedArray;
};
/*
 * 등수 계산
 * 0: 당첨 X / 1-5: 등수
 */
export const getWinResult = (result, history) => {
    const matchArray = getMatchedNumberArray(result, history);
    const matchBonus = matchArray.includes(result.bno);
    if (matchArray.length === 6) {
        return matchBonus ? 2 : 1;
    }
    if (!matchBonus && matchArray.length === 5) {
        return 3;
    }
    if (!matchBonus && matchArray.length === 4) {
        return 4;
    }
    if (!matchBonus && matchArray.length === 3) {
        return 5;
    }
    return 0;
};
