export const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const isEmptyArray = (arr) => {
    return Array.isArray(arr) && arr.length;
};
