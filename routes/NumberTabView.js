import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Ball from '../components/Ball';
import { createNumberSet } from '../utils/number';
import { isEmptyArray } from './../utils/check';
import { THEME_COLORS } from './../style/color';

export default function NumberTabView() {
    const [numbers, setNumbers] = useState([]);
    const translationY = new Array(6).fill(0).map(() => new Animated.Value(0));
    const ballTranslateY = translationY.map((val, idx) =>
        val.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [-36, 200, 700],
        })
    );

    useEffect(() => {
        if (!isEmptyArray(numbers)) {
            const createAnimations = translationY.map((val) => {
                val.setValue(0);
                return Animated.timing(val, {
                    toValue: 1,
                    duration: 1500,
                    easing: Easing.bounce,
                    useNativeDriver: true,
                });
            });
            Animated.stagger(150, createAnimations).start();
        }
    }, [numbers, translationY]);

    const createNumbers = () => {
        if (!isEmptyArray(numbers)) {
            // 이미 번호가 있을 경우 내려가는 애니메이션 이후 생성
            const destroyAnimations = translationY.map((val) => {
                return Animated.timing(val, {
                    toValue: 2,
                    duration: 1000,
                    easing: Easing.quad,
                    useNativeDriver: true,
                });
            });
            Animated.stagger(100, destroyAnimations).start((result) => {
                if (result.finished) {
                    setNumbers(createNumberSet());
                }
            });
        } else {
            setNumbers(createNumberSet());
        }
    };

    const renderNumbers = () => {
        return numbers.map((number, idx) => (
            <Animated.View
                key={number}
                style={{ transform: [{ translateY: ballTranslateY[idx] }] }}>
                <Ball number={number} />
            </Animated.View>
        ));
    };

    return (
        <View style={styles.screen}>
            <View style={styles.numberContainer}>{renderNumbers()}</View>
            <TouchableHighlight
                style={styles.createButton}
                underlayColor={THEME_COLORS.GRAY_600}
                onPress={createNumbers}>
                <Text style={styles.buttonText}>
                    {isEmptyArray(numbers) ? '번호 생성' : '번호 재생성'}
                </Text>
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: THEME_COLORS.GRAY_100,
    },
    numberContainer: {
        marginHorizontal: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    createButton: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 20,
        width: 150,
        height: 60,
        borderRadius: 15,
        backgroundColor: THEME_COLORS.MIDNIGHT_BLACK,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: THEME_COLORS.GRAY_900,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 3.84,
        shadowOpacity: 0.5,
        elevation: 5,
    },
    buttonText: {
        color: THEME_COLORS.GRAY_100,
        fontSize: 20,
        fontWeight: 'bold',
    },
});
