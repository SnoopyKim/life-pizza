import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Animated } from 'react-native';
import { THEME_COLORS } from './../../style/color';
import { setAlert } from './index';

const Alert = ({ message, onConfirm = () => {} }) => {
    const valueY = useRef(new Animated.Value(0)).current;
    const transY = valueY.interpolate({
        inputRange: [0, 1],
        outputRange: [30, 0],
    });

    useEffect(() => {
        Animated.timing(valueY, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [valueY]);

    return (
        <Animated.View style={[styles.container, { transform: [{ translateY: transY }] }]}>
            <View style={styles.content}>
                <Text style={styles.message}>{message}</Text>
            </View>
            <TouchableHighlight
                style={styles.confirm}
                underlayColor={THEME_COLORS.GRAY_200}
                onPress={() => {
                    onConfirm();
                    setAlert(false);
                }}>
                <Text style={styles.textConfirm}>확인</Text>
            </TouchableHighlight>
        </Animated.View>
    );
};

export default Alert;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: 200,
        backgroundColor: THEME_COLORS.GRAY_100,
        borderRadius: 20,
        elevation: 2,
    },
    content: {
        width: 200,
        padding: 20,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: THEME_COLORS.GRAY_200,
    },
    message: {
        fontSize: 16,
        color: THEME_COLORS.GRAY_700,
        textAlign: 'center',
    },
    confirm: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
    },
    textConfirm: {
        fontSize: 16,
        fontWeight: 'bold',
        color: THEME_COLORS.MIDNIGHT_BLACK,
    },
});
