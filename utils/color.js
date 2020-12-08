export const THEME_COLORS = {
    MIDNIGHT_DARK: '#171828',
    GRAY_50: '#F7F8F9',
    GRAY_100: '#E8EBED',
    GRAY_200: '#C9CDD2',
    GRAY_400: '#9EA4AA',
    GRAY_500: '#72787F',
    GRAY_600: '#454C53',
    GRAY_700: '#26282B',
    GRAY_900: '#1B1D1F',
};

export const BALL_COLORS = [
    'rgb(251, 196, 50)',
    'rgb(105, 200, 242)',
    'rgb(255, 114, 114)',
    'rgb(170, 170, 170)',
    'rgb(176, 216, 64)',
];

export const getBallColor = (number) => {
    const type = Math.floor((number - 1) / 10);
    return BALL_COLORS[type];
};
