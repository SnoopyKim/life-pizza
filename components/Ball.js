import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getBallColor } from '../style/color';
import { THEME_COLORS } from './../style/color';

export default function Ball({ number, size = 32, ...props }) {
    const getStyleForBox = () => {
        return {
            ...styles.box,
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: getBallColor(number),
        };
    };

    const getStyleForNumber = () => {
        return { ...styles.number, color: THEME_COLORS.GRAY_50, fontSize: size / 2 };
    };

    return (
        <View style={[getStyleForBox(), props.style]}>
            <Text style={[getStyleForNumber(), props.textStyle]}>{number}</Text>
        </View>
    );
}

export function UnCheckedBall({ number, size = 32, ...props }) {
    const getStyleForBox = () => {
        return {
            ...styles.box,
            width: size,
            height: size,
            borderColor: THEME_COLORS.GRAY_400,
            borderWidth: 3,
            borderRadius: size / 2,
            backgroundColor: THEME_COLORS.GRAY_50,
        };
    };

    const getStyleForNumber = () => {
        return { ...styles.number, color: THEME_COLORS.GRAY_400, fontSize: size / 2 };
    };

    return (
        <View style={[getStyleForBox(), props.style]}>
            <Text style={[getStyleForNumber(), props.textStyle]}>{number}</Text>
        </View>
    );
}

export function CheckBall({
    number,
    size = 36,
    checked = false,
    able = true,
    onCheck = (number, isChecked) => console.log(number, isChecked),
    ...props
}) {
    const transY = useRef(new Animated.Value(0)).current;
    const ballTransY = transY.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [0, -5, 0],
    });

    useEffect(() => {
        transY.setValue(0);
        Animated.timing(transY, {
            toValue: 2,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [checked, transY]);

    const ballProps = {
        number,
        size,
        ...props,
    };
    return (
        <Animated.View style={{ transform: [{ translateY: ballTransY }] }}>
            <TouchableOpacity onPress={() => onCheck(number, !checked)}>
                {checked ? <Ball {...ballProps} /> : <UnCheckedBall {...ballProps} />}
            </TouchableOpacity>
        </Animated.View>
    );
}

export function BallSet({ numbers, size = 32, style }) {
    const { no1, no2, no3, no4, no5, no6, bno } = numbers;
    const getDividingStyle = () => ({
        color: THEME_COLORS.MIDNIGHT_BLACK,
        lineHeight: size,
        fontSize: size * 0.7,
        fontWeight: '700',
    });
    return (
        <View style={[styles.numberView, style]}>
            <Ball number={no1} size={size} />
            <Ball number={no2} size={size} />
            <Ball number={no3} size={size} />
            <Ball number={no4} size={size} />
            <Ball number={no5} size={size} />
            <Ball number={no6} size={size} />
            {bno && <Text style={getDividingStyle()}>+</Text>}
            {bno && <Ball number={bno} size={size} />}
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    number: {
        fontWeight: '700',
    },
    numberView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});
