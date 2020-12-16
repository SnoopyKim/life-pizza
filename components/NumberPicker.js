import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { THEME_COLORS } from './../style/color';
import Ball from './Ball';
import downIcon from '../images/chevron-down.png';

export default function NumberPicker({ selected = [], limit = 6 }) {
    const [visible, setVisible] = useState(true);
    const bottom = useRef(new Animated.Value(0)).current;
    const transBottom = bottom.interpolate({
        inputRange: [0, 1],
        outputRange: [462, 0],
    });

    useEffect(() => {
        if (visible) {
            Animated.timing(bottom, {
                toValue: 1,
                duration: 500,
                delay: 100,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(bottom, {
                toValue: 0,
                duration: 500,
                delay: 100,
                useNativeDriver: true,
            }).start();
        }
    }, [visible, bottom]);

    return (
        <Animated.View style={[styles.container, { transform: [{ translateY: transBottom }] }]}>
            <TouchableOpacity style={styles.button} onPress={() => setVisible(!visible)}>
                <Image style={[styles.img, !visible && styles.reverse]} source={downIcon} />
            </TouchableOpacity>
            <View style={styles.numberContainer}>
                {[...Array(45).keys()].map((num) => (
                    <View style={styles.item}>
                        <Ball number={num + 1} size={46} style={styles.ball} />
                    </View>
                ))}
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: THEME_COLORS.GRAY_50,
        position: 'absolute',
        alignSelf: 'center',
        width: 322,
        height: 502,
        bottom: 0,
        elevation: 5,
        borderColor: THEME_COLORS.GRAY_200,
        borderWidth: 1,
    },
    button: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    numberContainer: {
        paddingHorizontal: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    img: {
        tintColor: THEME_COLORS.GRAY_600,
        width: 30,
        height: 30,
        transform: [{ scaleX: 2 }, { scaleY: 1.2 }],
    },
    reverse: {
        transform: [{ scaleX: 2 }, { scaleY: 1.2 }, { rotate: '180deg' }],
    },
    item: {
        marginHorizontal: 7,
        marginVertical: 2,
    },
});
