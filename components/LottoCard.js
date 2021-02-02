import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, View, Easing, TouchableHighlight } from 'react-native';
import iconSelected from '../images/hand-pointing-left.png';
import { CheckedBall, BallSet } from './Ball';
import { THEME_COLORS } from './../style/color';

export default function LottoCard({ children, data, selected }) {
    // 최신 결과만 처음부터 열려있는 상태

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerTitle}>
                    <Text style={styles.title}>{data.round}회</Text>
                    <Text style={styles.subtitle}>{data.date}</Text>
                    {selected && <Image source={iconSelected} style={styles.icon} />}
                </View>
            </View>
            <View style={[styles.content]}>
                <View style={styles.numberView}>
                    <BallSet numbers={data} />
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
    content: {
        flex: 1,
        paddingTop: 10,
        borderRadius: 20,
    },
    numberView: {
        marginBottom: 10,
    },
});
