import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { THEME_COLORS } from './../style/color';
import NumberPicker from './../components/NumberPicker';
import Ball from '../components/Ball';
import { addHistoryData } from '../db';
import { setAlert } from './../components/Popup/index';

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

    const confirmNumbers = () => {
        addHistoryData(numbers);
        setAlert(true, "번호가 저장되었습니다.\n'내 정보'에서 확인하세요");
        // setNumbers([]);
        pickerRef.current.initNumbers();
        pickerRef.current.slideUp();
    };

    const renderSelectedView = () => (
        <View style={styles.viewSelected}>
            {numbers.map((number, idx) => (
                <View key={number}>
                    <Ball number={number} />
                </View>
            ))}
        </View>
    );

    return (
        <View style={styles.screen}>
            <Text style={styles.textSelected}>선택한 번호</Text>
            {renderSelectedView()}
            {numbers.length === 6 && (
                <TouchableHighlight
                    underlayColor={THEME_COLORS.MIDNIGHT_BLACK}
                    onPress={confirmNumbers}>
                    <Text style={styles.buttonText}>번호 저장</Text>
                </TouchableHighlight>
            )}
            <NumberPicker ref={pickerRef} whenPick={onPick} />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: THEME_COLORS.MIDNIGHT_BLACK,
    },
    viewSelected: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 20,
    },
    textSelected: {
        color: THEME_COLORS.GRAY_50,
        marginStart: 20,
        marginTop: 15,
        marginBottom: 5,
        fontSize: 16,
    },
    buttonText: {
        color: THEME_COLORS.GRAY_100,
        fontSize: 20,
        fontWeight: 'bold',
    },
});
