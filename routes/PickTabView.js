import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { THEME_COLORS } from './../style/color';
import NumberPicker from './../components/NumberPicker';
import Ball from '../components/Ball';

export default function PickTabView() {
    const [numbers, setNumbers] = useState([]);
    const pickerRef = useRef(null);

    useEffect(() => {
        if (numbers.length === 6) {
            pickerRef.current.slideDown();
        }
    }, [numbers]);

    const onPick = (numberList) => {
        setNumbers(numberList);
    };

    const renderSelectedView = () => (
        <View style={styles.viewSelected}>
            {numbers.map((number, idx) => (
                <View key={number}>
                    <Ball number={number} style={styles.ball} />
                </View>
            ))}
        </View>
    );

    return (
        <View style={styles.screen}>
            <Text style={styles.textSelected}>선택한 번호</Text>
            {renderSelectedView()}
            <NumberPicker ref={pickerRef} whenPick={onPick} />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: THEME_COLORS.GRAY_100,
    },
    viewSelected: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    ball: {
        marginHorizontal: 10,
    },
    textSelected: {
        color: THEME_COLORS.MIDNIGHT_BLACK,
        marginStart: 20,
        marginTop: 15,
        marginBottom: 5,
        fontSize: 16,
    },
});
