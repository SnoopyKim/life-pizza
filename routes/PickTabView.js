import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { THEME_COLORS } from './../style/color';
import NumberPicker from './../components/NumberPicker';

export default function PickTabView() {
    return (
        <View style={styles.screen}>
            <Text>선택한 번호</Text>
            <NumberPicker />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: THEME_COLORS.GRAY_100,
    },
});
