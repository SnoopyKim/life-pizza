import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getBallColor } from '../style/color';
import { THEME_COLORS } from './../style/color';

export function CheckedBall({ number, size = 32, ...props }) {
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
            borderWidth: size / 16,
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

export default function Ball({
    number,
    size = 32,
    checked = true,
    able = false,
    animation = false,
    onCheck = (number, isChecked) => console.log(number, isChecked),
    ...props
}) {
    const transY = useRef(new Animated.Value(0)).current;
    const ballTransY = transY.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [0, -5, 0],
    });

    useEffect(() => {
        if (animation) {
            transY.setValue(0);
            Animated.timing(transY, {
                toValue: 2,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }
    }, [checked, transY]);

    const ballProps = {
        number,
        size,
        ...props,
    };
    return (
        <Animated.View style={{ transform: [{ translateY: ballTransY }] }}>
            <TouchableOpacity onPress={() => onCheck(number, !checked)} disabled={!able}>
                {checked ? <CheckedBall {...ballProps} /> : <UnCheckedBall {...ballProps} />}
            </TouchableOpacity>
        </Animated.View>
    );
}

export function BallSet({ numbers, uncheckList = [], size = 32, style }) {
    const { no1, no2, no3, no4, no5, no6, bno } = numbers;
    const getDividingStyle = () => ({
        color: THEME_COLORS.MIDNIGHT_BLACK,
        lineHeight: size,
        fontSize: size * 0.7,
        fontWeight: '700',
    });
    return (
        <View style={[styles.numberView, style]}>
            <Ball number={no1} size={size} checked={!uncheckList.includes(no1)} />
            <Ball number={no2} size={size} checked={!uncheckList.includes(no2)} />
            <Ball number={no3} size={size} checked={!uncheckList.includes(no3)} />
            <Ball number={no4} size={size} checked={!uncheckList.includes(no4)} />
            <Ball number={no5} size={size} checked={!uncheckList.includes(no5)} />
            <Ball number={no6} size={size} checked={!uncheckList.includes(no6)} />
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
