import React, { useCallback, useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { BALL_COLORS, THEME_COLORS } from './../../style/color';

const CONTAINER_SIZE = 200;
const BALL_SIZE = 30;

const Loading = () => {
    const rotate = useRef(new Animated.Value(0)).current;
    const rotateValue = rotate.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const getBallStyle = (num) => ({
        bottom: CONTAINER_SIZE / 2 - BALL_SIZE / 2,
        left: CONTAINER_SIZE / 2 - BALL_SIZE / 2,
        transform: [{ rotate: 72 * num + 'deg' }, { translateX: 45 }],
    });

    useEffect(() => {
        const loopAnimation = Animated.loop(
            Animated.timing(rotate, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
            })
        );
        loopAnimation.start();

        return () => {
            loopAnimation.stop();
            cancelAnimationFrame(loopAnimation);
            console.log('when Loading off');
        };
    }, [rotate]);

    return (
        <Animated.View style={[styles.loadingContainer, { transform: [{ rotate: rotateValue }] }]}>
            {BALL_COLORS.map((color, index) => (
                <View
                    key={index}
                    style={[styles.ball, { backgroundColor: color }, getBallStyle(index)]}
                />
            ))}
        </Animated.View>
    );
};

export default Loading;

const styles = StyleSheet.create({
    loadingContainer: {
        width: CONTAINER_SIZE,
        height: CONTAINER_SIZE,
        backgroundColor: THEME_COLORS.TRANSPARENT,
    },
    ball: {
        position: 'absolute',
        width: BALL_SIZE,
        height: BALL_SIZE,
        borderRadius: BALL_SIZE / 2,
    },
});
