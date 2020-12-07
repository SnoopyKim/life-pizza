import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function LottoCard({ data }) {
    return (
        <View key={data.date} style={styles.container}>
            <Text>
                {data.round}회 ({data.date})
            </Text>
            <Text>
                {data.no1} {data.no2} {data.no3} {data.no4} {data.no5}{' '}
                {data.no6} {data.bno}
            </Text>
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
    },
});
