import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import iconArrow from '../images/chevron-down.png';
import { getCurrentRound } from '../modules/api';
import Ball from './Ball';

export default function LottoCard({ data }) {
    // 최신 결과만 처음부터 열려있는 상태
    const [isOpen, setIsOpen] = useState(data.round === getCurrentRound());

    const toggleCard = () => {
        setIsOpen(!isOpen);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.header} onPress={toggleCard}>
                <View style={styles.headerTitle}>
                    <Text style={styles.title}>{data.round}회</Text>
                    <Text style={styles.subtitle}>{data.date}</Text>
                </View>
                <Image
                    style={[styles.icon, isOpen && styles.reverse]}
                    source={iconArrow}
                    resizeMode={'contain'}
                />
            </TouchableOpacity>
            {isOpen && (
                <View style={styles.content}>
                    <Ball number={data.no1} style={styles.firstBall} />
                    <Ball number={data.no2} style={styles.ball} />
                    <Ball number={data.no3} style={styles.ball} />
                    <Ball number={data.no4} style={styles.ball} />
                    <Ball number={data.no5} style={styles.ball} />
                    <Ball number={data.no6} style={styles.ball} />
                    <Text style={styles.dividing}>+</Text>
                    <Ball number={data.bno} style={styles.bonusBall} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: 'black',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 5,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        height: 40,
    },
    headerTitle: {
        flex: 1,
    },
    title: {
        color: 'black',
        fontSize: 16,
        fontWeight: '500',
    },
    subtitle: {
        color: 'gray',
        fontSize: 13,
        fontWeight: '400',
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
        flexDirection: 'row',
        paddingVertical: 10,
    },
    ball: {
        marginHorizontal: 3,
    },
    firstBall: {
        marginEnd: 3,
    },
    bonusBall: {
        marginStart: 3,
    },
    dividing: {
        color: 'black',
        lineHeight: 36,
        fontSize: 24,
        fontWeight: '700',
        marginHorizontal: 3,
    },
});
