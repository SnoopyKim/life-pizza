import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getBallColor } from '../style/color';

export default function Ball({ number, ...props }) {
    return (
        <View
            style={[
                { backgroundColor: getBallColor(number) },
                styles.box,
                props.style,
            ]}>
            <Text style={styles.number}>{number}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
    },
    number: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
    },
});
