import { isEmptyObject } from './check';

export const createRandomNumber = () => {
    return Math.floor(Math.random() * 45) + 1;
};

export const createNumberSet = () => {
    const set = [];
    while (set.length < 6) {
        const num = createRandomNumber();
        if (!set.includes(num)) {
            set.push(num);
        }
    }
    return set.sort((a, b) => a - b);
};

export const numberToStringWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const stringToNumberWithoutCommas = (str) => {
    return parseInt(str.replace(/[^0-9]/g, ''), 10);
};

export const getOnlyNumbersFromObject = (obj = {}) => {
    if (isEmptyObject(obj)) {
        return {};
    } else {
        return (({ no1, no2, no3, no4, no5, no6 }) => ({ no1, no2, no3, no4, no5, no6 }))(obj);
    }
};
