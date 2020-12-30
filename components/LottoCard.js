import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View, Easing } from 'react-native';
import iconArrow from '../images/chevron-down.png';
import { getCurrentRound } from '../modules/api';
import Ball from './Ball';
import { THEME_COLORS } from './../style/color';

export default function LottoCard({ children, data }) {
    // 최신 결과만 처음부터 열려있는 상태
    const [opened, setOpened] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [cardHeight, setCardHeight] = useState(0);
    const [contentHeight, setContentHeight] = useState(0);

    const rotateValue = useRef(new Animated.Value(0)).current;
    const rotate = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });
    const transValue = useRef(new Animated.Value(0)).current;
    const heightValue = useRef(new Animated.Value(0)).current;

    const onCardMounted = (e) => {
        if (!mounted) {
            setCardHeight(e.nativeEvent.layout.height);
        }
    };
    const onContentMounted = (e) => {
        if (!mounted) {
            setContentHeight(e.nativeEvent.layout.height);
        }
    };

    useEffect(() => {
        if (cardHeight * contentHeight !== 0) {
            heightValue.setValue(cardHeight);
            setMounted(true);
        }
    }, [cardHeight, contentHeight]);

    useEffect(() => {
        if (mounted) {
            setOpened(data.round === getCurrentRound());
        }
    }, [mounted]);

    useEffect(() => {
        if (!mounted) {
            return;
        }
        const rotateAnimation = Animated.timing(rotateValue, {
            toValue: opened ? 1 : 0,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
        });
        const heightAnimation = Animated.timing(heightValue, {
            toValue: opened ? cardHeight + contentHeight : cardHeight,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: false,
        });
        const transAnimation = Animated.timing(transValue, {
            toValue: opened ? contentHeight : 0,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
        });
        Animated.parallel([rotateAnimation, heightAnimation, transAnimation]).start();
    }, [opened]);

    return (
        <Animated.View
            style={[styles.container, { height: mounted ? heightValue : undefined }]}
            onLayout={onCardMounted}>
            <TouchableOpacity
                style={styles.header}
                activeOpacity={1.0}
                onPress={() => setOpened(!opened)}>
                <View style={styles.headerTitle}>
                    <Text style={styles.title}>{data.round}회</Text>
                    <Text style={styles.subtitle}>{data.date}</Text>
                </View>
                <Animated.Image
                    style={[styles.icon, { transform: [{ rotate: rotate }] }]}
                    source={iconArrow}
                    resizeMode={'contain'}
                />
            </TouchableOpacity>
            <Animated.View
                style={[
                    styles.content,
                    { marginTop: -75, transform: [{ translateY: transValue }] },
                ]}
                onLayout={onContentMounted}>
                <View style={styles.numberView}>
                    <Ball number={data.no1} style={styles.firstBall} />
                    <Ball number={data.no2} style={styles.ball} />
                    <Ball number={data.no3} style={styles.ball} />
                    <Ball number={data.no4} style={styles.ball} />
                    <Ball number={data.no5} style={styles.ball} />
                    <Ball number={data.no6} style={styles.ball} />
                    <Text style={styles.dividing}>+</Text>
                    <Ball number={data.bno} style={styles.bonusBall} />
                </View>
                {children}
            </Animated.View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        minHeight: 60,
        backgroundColor: THEME_COLORS.GRAY_50,
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 2,
        margin: 2,
    },
    header: {
        backgroundColor: THEME_COLORS.GRAY_50,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        flexDirection: 'row',
        zIndex: 5,
    },
    headerTitle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        color: 'black',
        fontSize: 16,
        fontWeight: '700',
    },
    subtitle: {
        color: 'gray',
        fontSize: 13,
        fontWeight: '400',
        marginStart: 10,
    },
    icon: {
        marginVertical: 5,
        width: 30,
        height: 30,
    },
    reverse: {
        transform: [{ rotate: '180deg' }],
    },
    content: {
        flex: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingTop: 5,
        paddingBottom: 15,
        backgroundColor: THEME_COLORS.GRAY_50,
    },
    numberView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    dividing: {
        color: 'black',
        lineHeight: 36,
        fontSize: 24,
        fontWeight: '700',
    },
});
