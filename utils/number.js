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
