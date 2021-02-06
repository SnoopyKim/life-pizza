import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import arrowIcon from '../images/chevron-down.png';
import { THEME_COLORS } from '../style/color';

export default function NavItem({ title = 'NavItem', onPress = () => {} }) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.title}>{title}</Text>
            <Image source={arrowIcon} resizeMode="contain" style={styles.icon} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,
    },
    title: {
        color: THEME_COLORS.GRAY_100,
        fontSize: 20,
        lineHeight: 38,
        marginBottom: 2,
    },
    icon: {
        width: 40,
        height: 40,
        tintColor: THEME_COLORS.GRAY_100,
        transform: [{ rotate: '-90deg' }, { scaleY: 0.8 }],
    },
});
