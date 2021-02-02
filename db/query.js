export const getQueryForFindHistory = (item) => {
    return `round == ${item.round} && no1 == ${item.no1} && no2 == ${item.no2} && no3 == ${item.no3} && no4 == ${item.no4} && no5 == ${item.no5} && no6 == ${item.no6}`;
};
