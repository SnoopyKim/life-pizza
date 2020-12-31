import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getBallColor } from './../../style/color';
import { numberToStringWithCommas } from './../../utils/number';

const PriceText = ({ rank, count, price }) => {
    return (
        <View style={styles.textView}>
            <Text style={[styles.rank, { color: getBallColor(rank * 10) }]}>{rank}등</Text>
            <Text style={[styles.price, { color: getBallColor(rank * 10) }]}>
                {numberToStringWithCommas(price)}원 ({numberToStringWithCommas(count)}명)
            </Text>
        </View>
    );
};

export default PriceText;

const styles = StyleSheet.create({
    textView: {
        height: 24,
        flexDirection: 'row',
    },
    rank: {
        flex: 1,
    },
    price: {},
});
