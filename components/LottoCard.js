import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, View, Easing, TouchableHighlight } from 'react-native';
import iconSelected from '../images/hand-pointing-left.png';
import Ball from './Ball';
import { THEME_COLORS } from './../style/color';

export default function LottoCard({ children, data, selected }) {
    // 최신 결과만 처음부터 열려있는 상태
    const { no1, no2, no3, no4, no5, no6, bno } = data;

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
                <View style={styles.numberView}>
                    <Ball number={no1} style={styles.firstBall} />
                    <Ball number={no2} style={styles.ball} />
                    <Ball number={no3} style={styles.ball} />
                    <Ball number={no4} style={styles.ball} />
                    <Ball number={no5} style={styles.ball} />
                    <Ball number={no6} style={styles.ball} />
                    {bno && <Text style={styles.dividing}>+</Text>}
                    {bno && <Ball number={bno} style={styles.bonusBall} />}
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
        marginBottom: 10,
    },
    dividing: {
        color: 'black',
        lineHeight: 36,
        fontSize: 24,
        fontWeight: '700',
    },
});
