import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getBallColor } from '../style/color';
import { THEME_COLORS } from './../style/color';

export default function Ball({ number, size = 36, ...props }) {
    const getStyleForBox = (size) => {
        return {
            ...styles.box,
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: getBallColor(number),
        };
    };

    const getStyleForNumber = (size) => {
        return { ...styles.number, color: THEME_COLORS.GRAY_50, fontSize: size / 2 };
    };

    return (
        <View style={[getStyleForBox(size), props.style]}>
            <Text style={[getStyleForNumber(size), props.textStyle]}>{number}</Text>
        </View>
    );
}

export function UnCheckedBall({ number, size = 36, ...props }) {
    const getStyleForBox = (size) => {
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

    const getStyleForNumber = (size) => {
        return { ...styles.number, color: THEME_COLORS.GRAY_400, fontSize: size / 2 };
    };

    return (
        <View style={[getStyleForBox(size), props.style]}>
            <Text style={[getStyleForNumber(size), props.textStyle]}>{number}</Text>
        </View>
    );
}

export function CheckBall({
    number,
    size = 36,
    checked = false,
    able = true,
    onCheck = (number) => console.log(number),
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

const styles = StyleSheet.create({
    box: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    number: {
        fontWeight: '700',
    },
});
