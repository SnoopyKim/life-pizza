import React, { useEffect, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Ball from '../components/Ball';
import { createNumberSet } from '../utils/number';
import { isEmptyArray } from '../utils/check';
import { THEME_COLORS } from '../style/color';
import { addHistoryData } from '../db';
import { setAlert } from './../components/Popup/index';

export default function CreateTabView() {
    const [numbers, setNumbers] = useState([]);
    const translationY = new Array(6).fill(0).map(() => new Animated.Value(0));
    const ballTranslateY = translationY.map((val, idx) =>
        val.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [-32, 200, 700],
        })
    );

    useEffect(() => {
        if (!isEmptyArray(numbers)) {
            const createAnimations = translationY.map((val) => {
                val.setValue(0);
                return Animated.timing(val, {
                    toValue: 1,
                    duration: 1200,
                    easing: Easing.bounce,
                    delay: 10,
                    useNativeDriver: true,
                });
            });
            Animated.stagger(100, createAnimations).start();
        }
    }, [numbers, translationY]);

    const createNumbers = () => {
        if (!isEmptyArray(numbers)) {
            // 이미 번호가 있을 경우 내려가는 애니메이션 이후 생성
            const destroyAnimations = translationY.map((val) => {
                return Animated.timing(val, {
                    toValue: 2,
                    duration: 800,
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

    const confirmNumbers = () => {
        addHistoryData(numbers);
        setAlert(true, "번호가 저장되었습니다.\n'내 정보'에서 확인하세요");
        setNumbers([]);
    };

    const renderNumbers = () => {
        return numbers.map((number, idx) => (
            <Animated.View key={number} style={{ transform: [{ translateY: ballTranslateY[idx] }] }}>
                <Ball number={number} />
            </Animated.View>
        ));
    };

    return (
        <View style={styles.screen}>
            <View style={styles.numberContainer}>{renderNumbers()}</View>
            <View style={styles.buttonWrapper}>
                <TouchableHighlight
                    style={styles.button}
                    underlayColor={THEME_COLORS.MIDNIGHT_BLACK}
                    onPress={createNumbers}>
                    <Text style={styles.buttonText}>{isEmptyArray(numbers) ? '번호 생성' : '번호 재생성'}</Text>
                </TouchableHighlight>
                {!isEmptyArray(numbers) && (
                    <TouchableHighlight
                        style={styles.button}
                        underlayColor={THEME_COLORS.MIDNIGHT_BLACK}
                        onPress={confirmNumbers}>
                        <Text style={styles.buttonText}>번호 저장</Text>
                    </TouchableHighlight>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: THEME_COLORS.MIDNIGHT_BLACK,
    },
    numberContainer: {
        marginHorizontal: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonWrapper: {
        position: 'absolute',
        marginHorizontal: 20,
        justifyContent: 'space-around',
        start: 0,
        end: 0,
        bottom: 20,
        flexDirection: 'row',
    },
    button: {
        width: 130,
        height: 50,
        borderRadius: 10,
        backgroundColor: THEME_COLORS.MIDNIGHT_BLACK,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: THEME_COLORS.GRAY_100,
        fontSize: 20,
        fontWeight: 'bold',
    },
});
