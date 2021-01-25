import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, View, Easing, TouchableHighlight } from 'react-native';
import iconSelected from '../images/hand-pointing-left.png';
import Ball from './Ball';
import { THEME_COLORS } from './../style/color';

const ANIM_DURATION = 250;

export default function LottoCard({ children, data, selected }) {
    // 최신 결과만 처음부터 열려있는 상태
    const { numbers } = data;

    return (
        <View style={[styles.container, selected && styles.selected]}>
            <View style={styles.header}>
                <View style={styles.headerTitle}>
                    <Text style={styles.title}>{data.round}회</Text>
                    <Text style={styles.subtitle}>{data.date}</Text>
                    {selected && <Image source={iconSelected} style={styles.icon} />}
                </View>
            </View>
            <View style={[styles.content]}>
                <View style={[styles.numberView, children && { marginBottom: 10 }]}>
                    <Ball number={numbers.no1} style={styles.firstBall} />
                    <Ball number={numbers.no2} style={styles.ball} />
                    <Ball number={numbers.no3} style={styles.ball} />
                    <Ball number={numbers.no4} style={styles.ball} />
                    <Ball number={numbers.no5} style={styles.ball} />
                    <Ball number={numbers.no6} style={styles.ball} />
                    <Text style={styles.dividing}>+</Text>
                    <Ball number={numbers.bno} style={styles.bonusBall} />
                </View>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        padding: 15,
        minHeight: 60,
        backgroundColor: THEME_COLORS.GRAY_50,
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 2,
        margin: 2,
    },
    header: {
        height: 30,
        borderRadius: 20,
        paddingHorizontal: 5,
        flexDirection: 'row',
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
        marginStart: 10,
        width: 25,
        height: 25,
        tintColor: THEME_COLORS.MIDNIGHT_BLACK,
    },
    reverse: {
        transform: [{ rotate: '180deg' }],
    },
    content: {
        flex: 1,
        paddingTop: 10,
        borderRadius: 20,
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
