export const isEmptyObject = (obj) => {
    console.log(obj, obj === Object(null));
    return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const isEmptyArray = (arr) => {
    return Array.isArray(arr) && arr.length;
};
