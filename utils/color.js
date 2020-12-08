export const BALL_COLORS = [
    'rgb(250, 200, 50)',
    'rgb(0, 80, 150)',
    'rgb(200, 60, 50)',
    'rgb(170, 170, 170)',
    'rgb(50, 160, 50)',
];

export const getBallColor = (number) => {
    const type = Math.floor((number - 1) / 10);
    return BALL_COLORS[type];
};
