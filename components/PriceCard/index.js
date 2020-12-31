import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import PriceText from './PriceText';
import { THEME_COLORS } from './../../style/color';
import loadingImg from '../../images/loading.png';
import { isEmptyObject } from './../../utils/check';

const PriceCard = ({ data }) => {
    if (isEmptyObject(data)) {
        return (
            <View style={{ alignSelf: 'center' }}>
                <Image source={loadingImg} width={24} />
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{data.round}회 당첨금 정보</Text>
            <PriceText rank={1} count={data.firstWinCnt} price={data.firstWinPrc} />
            <PriceText rank={2} count={data.secondWinCnt} price={data.secondWinPrc} />
            <PriceText rank={3} count={data.thirdWinCnt} price={data.thirdWinPrc} />
            <PriceText rank={4} count={data.fourthWinCnt} price={data.fourthWinPrc} />
            <PriceText rank={5} count={data.fifthWinCnt} price={data.fifthWinPrc} />
        </View>
    );
};

export default PriceCard;

const styles = StyleSheet.create({
    container: {
        width: 300,
        minHeight: 150,
        borderRadius: 20,
        backgroundColor: THEME_COLORS.MIDNIGHT_BLACK,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    title: {
        color: THEME_COLORS.GRAY_100,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
});
