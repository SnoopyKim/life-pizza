import { THEME_COLORS } from './color';

export const getTabBarIconStyle = (focused) => {
    return {
        width: focused ? 26 : 22,
        height: focused ? 26 : 22,
        tintColor: focused ? THEME_COLORS.GRAY_100 : THEME_COLORS.GRAY_400,
        marginTop: 4,
    };
};

export const getTabBarLabelStyle = () => {
    return {
        color: THEME_COLORS.GRAY_100,
        fontSize: 11,
        marginBottom: 4,
    };
};
